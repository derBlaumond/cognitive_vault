/**
 * LinkedIn Learning Transcript Extractor (브라우저 콘솔용)
 * 
 * 사용 방법:
 * 1. LinkedIn Learning 강의 페이지를 엽니다
 * 2. F12를 눌러 개발자 도구를 엽니다
 * 3. Console 탭으로 이동합니다
 * 4. 이 스크립트를 복사하여 붙여넣고 Enter를 누릅니다
 * 5. Transcript가 자동으로 추출되어 다운로드됩니다
 * 
 * 여러 강의를 처리하려면 각 강의 페이지에서 반복 실행하세요.
 */

(function() {
  'use strict';

  // Transcript 버튼 찾기 및 클릭
  function findAndClickTranscriptButton() {
    const selectors = [
      'button[aria-label*="transcript" i]',
      'button[aria-label*="Transcript" i]',
      'button[data-control-name*="transcript" i]',
      '.transcript-toggle',
    ];

    for (const selector of selectors) {
      const button = document.querySelector(selector);
      if (button) {
        button.click();
        return true;
      }
    }

    // 텍스트로 찾기
    const buttons = Array.from(document.querySelectorAll('button'));
    const transcriptButton = buttons.find(btn => 
      btn.textContent.toLowerCase().includes('transcript') ||
      btn.getAttribute('aria-label')?.toLowerCase().includes('transcript')
    );

    if (transcriptButton) {
      transcriptButton.click();
      return true;
    }

    return false;
  }

  // Transcript 내용 추출
  function extractTranscript() {
    const selectors = [
      '.transcript-content',
      '.transcript-body',
      '[data-transcript-content]',
      '.transcript-panel',
      '.transcript',
      '[role="log"]',
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element.innerText || element.textContent;
      }
    }

    // 모든 텍스트에서 transcript 관련 내용 찾기
    const allText = document.body.innerText;
    if (allText.length > 100) {
      // 시간 스탬프 제거
      const lines = allText.split('\n').filter(line => {
        const trimmed = line.trim();
        return !/^\d{1,2}:\d{2}(:\d{2})?/.test(trimmed) &&
               !/^\[\d{1,2}:\d{2}(:\d{2})?\]/.test(trimmed) &&
               trimmed.length > 0;
      });
      return lines.join('\n');
    }

    return allText;
  }

  // 강의 제목 추출
  function extractTitle() {
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
  }

  // 파일명을 안전하게 만들기
  function sanitizeFilename(filename) {
    return filename
      .replace(/[<>:"/\\|?*]/g, '-')
      .replace(/\s+/g, '_')
      .substring(0, 100);
  }

  // 텍스트를 파일로 다운로드
  function downloadText(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 메인 실행
  console.log('🚀 Transcript 추출 시작...');

  // Transcript 버튼 클릭
  if (!findAndClickTranscriptButton()) {
    console.error('❌ Transcript 버튼을 찾을 수 없습니다. 수동으로 Transcript 패널을 열어주세요.');
    console.log('💡 Transcript 패널을 수동으로 연 후, 다음 명령을 실행하세요:');
    console.log('   extractTranscriptNow()');
    
    // 전역 함수로 등록 (수동 실행용)
    window.extractTranscriptNow = function() {
      setTimeout(() => {
        const transcript = extractTranscript();
        const title = extractTitle();
        const safeTitle = sanitizeFilename(title);
        const filename = `${safeTitle}_transcript.txt`;
        const content = `강의 제목: ${title}\nURL: ${window.location.href}\n\n${'='.repeat(80)}\n\n${transcript}`;
        
        downloadText(content, filename);
        console.log(`✅ 다운로드 완료: ${filename}`);
      }, 1000);
    };
    return;
  }

  // 잠시 대기 후 transcript 추출
  setTimeout(() => {
    const transcript = extractTranscript();
    
    if (!transcript || transcript.trim().length < 50) {
      console.error('❌ Transcript 내용을 찾을 수 없습니다.');
      console.log('💡 잠시 후 다시 시도하거나, 수동으로 Transcript 패널을 확인해주세요.');
      return;
    }

    const title = extractTitle();
    const safeTitle = sanitizeFilename(title);
    const filename = `${safeTitle}_transcript.txt`;
    const content = `강의 제목: ${title}\nURL: ${window.location.href}\n\n${'='.repeat(80)}\n\n${transcript}`;
    
    downloadText(content, filename);
    console.log(`✅ 다운로드 완료: ${filename}`);
    console.log(`📝 Transcript 길이: ${transcript.length}자`);
  }, 2000);
})();

