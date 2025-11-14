#!/usr/bin/env node

/**
 * LinkedIn Learning Transcript Downloader
 * 
 * 이 스크립트는 LinkedIn Learning 강의의 transcript를 자동으로 다운로드합니다.
 * 
 * 사용 방법:
 * 1. LinkedIn Learning에 로그인한 상태에서 사용하세요
 * 2. 강의 URL 목록을 urls.txt 파일에 한 줄씩 입력하세요
 * 3. node download-transcripts.js 실행
 * 
 * 주의사항:
 * - LinkedIn Learning의 이용약관을 준수하세요
 * - 개인 학습 목적으로만 사용하세요
 * - 과도한 요청으로 인한 계정 제재를 피하기 위해 딜레이를 두었습니다
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// 설정
const CONFIG = {
  urlsFile: 'urls.txt', // 강의 URL 목록 파일
  outputDir: 'transcripts', // transcript 저장 폴더
  delayBetweenRequests: 2000, // 요청 간 딜레이 (밀리초)
  headless: false, // 브라우저를 보이게 할지 여부 (로그인 필요시 false 권장)
  timeout: 30000, // 페이지 로딩 타임아웃
};

/**
 * 강의 URL에서 transcript를 추출합니다
 */
async function extractTranscript(page, url) {
  try {
    console.log(`\n📹 강의 접속 중: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: CONFIG.timeout });

    // Transcript 버튼 찾기 및 클릭
    console.log('  🔍 Transcript 버튼 찾는 중...');
    
    // 여러 가능한 selector 시도
    const transcriptSelectors = [
      'button[aria-label*="transcript" i]',
      'button[aria-label*="Transcript" i]',
      'button[data-control-name*="transcript" i]',
      '.transcript-toggle',
      'button:has-text("Transcript")',
    ];

    let transcriptButton = null;
    for (const selector of transcriptSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        transcriptButton = await page.$(selector);
        if (transcriptButton) {
          console.log(`  ✓ Transcript 버튼 발견: ${selector}`);
          break;
        }
      } catch (e) {
        // 다음 selector 시도
        continue;
      }
    }

    if (!transcriptButton) {
      // JavaScript로 직접 찾기 시도
      transcriptButton = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(btn => 
          btn.textContent.toLowerCase().includes('transcript') ||
          btn.getAttribute('aria-label')?.toLowerCase().includes('transcript')
        );
      });
    }

    if (!transcriptButton || transcriptButton === null) {
      throw new Error('Transcript 버튼을 찾을 수 없습니다');
    }

    // 버튼 클릭
    await transcriptButton.click();
    console.log('  ✓ Transcript 패널 열기');

    // Transcript 내용이 로드될 때까지 대기
    await page.waitForTimeout(2000);

    // Transcript 내용 추출
    console.log('  📝 Transcript 내용 추출 중...');
    
    const transcriptContent = await page.evaluate(() => {
      // 여러 가능한 selector 시도
      const selectors = [
        '.transcript-content',
        '.transcript-body',
        '[data-transcript-content]',
        '.transcript-panel',
        '.transcript',
        '[role="log"]',
        '.srt-cue',
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          return element.innerText || element.textContent;
        }
      }

      // 모든 텍스트 요소에서 transcript 관련 내용 찾기
      const allText = document.body.innerText;
      if (allText.includes('Transcript') || allText.length > 100) {
        // 시간 스탬프 제거 시도
        const lines = allText.split('\n').filter(line => {
          // 시간 스탬프 패턴 제거 (예: 00:00:00, 00:00, [00:00])
          return !/^\d{1,2}:\d{2}(:\d{2})?/.test(line.trim()) &&
                 !/^\[\d{1,2}:\d{2}(:\d{2})?\]/.test(line.trim());
        });
        return lines.join('\n');
      }

      return allText;
    });

    if (!transcriptContent || transcriptContent.trim().length < 50) {
      throw new Error('Transcript 내용을 찾을 수 없거나 너무 짧습니다');
    }

    console.log(`  ✓ Transcript 추출 완료 (${transcriptContent.length}자)`);
    return transcriptContent.trim();

  } catch (error) {
    console.error(`  ❌ 오류 발생: ${error.message}`);
    throw error;
  }
}

/**
 * URL에서 강의 제목 추출
 */
async function extractTitle(page) {
  try {
    const title = await page.evaluate(() => {
      const selectors = [
        'h1',
        '.course-title',
        '[data-test-id="course-title"]',
        '.video-title',
      ];
      
      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          return element.innerText || element.textContent;
        }
      }
      return document.title;
    });
    
    return title.trim();
  } catch (error) {
    return 'unknown-title';
  }
}

/**
 * 파일명을 안전하게 만듭니다
 */
function sanitizeFilename(filename) {
  return filename
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, '_')
    .substring(0, 100);
}

/**
 * 메인 함수
 */
async function main() {
  console.log('🚀 LinkedIn Learning Transcript Downloader 시작\n');

  // 출력 폴더 생성
  const outputPath = path.join(__dirname, CONFIG.outputDir);
  await fs.mkdir(outputPath, { recursive: true });
  console.log(`📁 출력 폴더: ${outputPath}\n`);

  // URL 목록 읽기
  let urls;
  try {
    const urlsContent = await fs.readFile(CONFIG.urlsFile, 'utf-8');
    urls = urlsContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#') && line.startsWith('http'));
    
    if (urls.length === 0) {
      throw new Error(`${CONFIG.urlsFile} 파일에 유효한 URL이 없습니다`);
    }
    
    console.log(`📋 총 ${urls.length}개의 강의 URL을 찾았습니다\n`);
  } catch (error) {
    console.error(`❌ ${CONFIG.urlsFile} 파일을 읽을 수 없습니다: ${error.message}`);
    console.log('\n💡 urls.txt 파일을 생성하고 각 줄에 강의 URL을 입력하세요.');
    console.log('   예시:');
    console.log('   https://www.linkedin.com/learning/javascript-essential-training/...');
    process.exit(1);
  }

  // 브라우저 실행
  console.log('🌐 브라우저 실행 중...');
  const browser = await puppeteer.launch({
    headless: CONFIG.headless,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // LinkedIn Learning에 로그인되어 있는지 확인
  console.log('🔐 LinkedIn Learning 로그인 확인 중...');
  try {
    await page.goto('https://www.linkedin.com/learning', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.waitForTimeout(2000);
  } catch (error) {
    console.log('⚠️  LinkedIn Learning 접속 확인 중 오류 발생 (계속 진행합니다)');
  }

  const results = {
    success: [],
    failed: [],
  };

  // 각 URL 처리
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const index = i + 1;
    
    console.log(`\n[${index}/${urls.length}] 처리 중...`);

    try {
      // Transcript 추출
      const transcript = await extractTranscript(page, url);
      
      // 강의 제목 추출
      const title = await extractTitle(page);
      const safeTitle = sanitizeFilename(title);
      const filename = `${String(index).padStart(3, '0')}_${safeTitle}.txt`;
      const filepath = path.join(outputPath, filename);

      // 파일 저장
      const content = `강의 제목: ${title}\nURL: ${url}\n\n${'='.repeat(80)}\n\n${transcript}`;
      await fs.writeFile(filepath, content, 'utf-8');
      
      console.log(`  ✅ 저장 완료: ${filename}`);
      results.success.push({ url, title, filename });

      // 다음 요청 전 딜레이
      if (i < urls.length - 1) {
        console.log(`  ⏳ ${CONFIG.delayBetweenRequests / 1000}초 대기 중...`);
        await page.waitForTimeout(CONFIG.delayBetweenRequests);
      }

    } catch (error) {
      console.error(`  ❌ 실패: ${error.message}`);
      results.failed.push({ url, error: error.message });
    }
  }

  // 브라우저 종료
  await browser.close();

  // 결과 요약
  console.log('\n' + '='.repeat(80));
  console.log('📊 다운로드 완료!');
  console.log('='.repeat(80));
  console.log(`✅ 성공: ${results.success.length}개`);
  console.log(`❌ 실패: ${results.failed.length}개`);
  
  if (results.failed.length > 0) {
    console.log('\n실패한 강의:');
    results.failed.forEach(({ url, error }) => {
      console.log(`  - ${url}`);
      console.log(`    오류: ${error}`);
    });
  }

  // 결과를 JSON 파일로 저장
  const resultsPath = path.join(outputPath, 'download-results.json');
  await fs.writeFile(resultsPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n📄 상세 결과: ${resultsPath}`);
  console.log(`📁 Transcript 파일 위치: ${outputPath}\n`);
}

// 실행
main().catch(error => {
  console.error('\n❌ 치명적 오류:', error);
  process.exit(1);
});

