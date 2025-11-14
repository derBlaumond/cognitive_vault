const fs = require('fs');
const path = require('path');

/**
 * 각 CHAPTER#_MOVIE# 폴더의 파일들을 markdown으로 정리하는 스크립트
 */

// 파일 확장자에 따른 언어 타입 매핑
const getLanguage = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const langMap = {
    '.js': 'javascript',
    '.html': 'html',
    '.css': 'css',
    '.json': 'json',
    '.md': 'markdown'
  };
  return langMap[ext] || 'text';
};

// 파일을 읽고 내용 반환
const readFileContent = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return `// 파일을 읽을 수 없습니다: ${error.message}`;
  }
};

// 폴더 내의 모든 파일 목록 가져오기 (재귀적)
const getAllFiles = (dirPath, basePath = '') => {
  const files = [];
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = path.join(basePath, item.name);

    // 숨김 파일이나 node_modules 등은 제외
    if (item.name.startsWith('.') || item.name === 'node_modules') {
      continue;
    }

    if (item.isDirectory()) {
      // 하위 디렉토리의 파일들도 포함
      files.push(...getAllFiles(fullPath, relativePath));
    } else {
      // README.md는 제외 (자기 자신)
      if (item.name !== 'README.md') {
        files.push({
          name: item.name,
          path: fullPath,
          relativePath: relativePath
        });
      }
    }
  }

  return files;
};

// 폴더명에서 챕터와 비디오 번호 추출
const parseFolderName = (folderName) => {
  const match = folderName.match(/^(\d+)_(\d+)(e)?$/);
  if (match) {
    return {
      chapter: parseInt(match[1]),
      movie: parseInt(match[2]),
      isEndState: !!match[3]
    };
  }
  return null;
};

// Markdown 문서 생성
const generateMarkdown = (folderPath, folderName) => {
  const files = getAllFiles(folderPath);
  const folderInfo = parseFolderName(folderName);

  let markdown = `# ${folderName}\n\n`;

  // 폴더 정보
  if (folderInfo) {
    markdown += `**Chapter ${folderInfo.chapter} - Movie ${folderInfo.movie}**`;
    if (folderInfo.isEndState) {
      markdown += ` *(End State)*`;
    }
    markdown += `\n\n`;
  }

  markdown += `This folder contains exercise files for the JavaScript Essential Training course.\n\n`;
  markdown += `---\n\n`;

  // 파일 목록
  if (files.length === 0) {
    markdown += `*이 폴더에는 파일이 없습니다.*\n`;
    return markdown;
  }

  markdown += `## 파일 구조\n\n`;
  markdown += `\`\`\`\n`;
  files.forEach(file => {
    markdown += `${file.relativePath}\n`;
  });
  markdown += `\`\`\`\n\n`;
  markdown += `---\n\n`;

  // 각 파일의 내용
  markdown += `## 파일 내용\n\n`;

  files.forEach((file, index) => {
    const content = readFileContent(file.path);
    const language = getLanguage(file.name);
    const fileExt = path.extname(file.name);

    markdown += `### ${file.relativePath}\n\n`;
    markdown += `\`\`\`${language}\n`;
    markdown += content;
    markdown += `\n\`\`\`\n\n`;

    // 마지막 파일이 아니면 구분선 추가
    if (index < files.length - 1) {
      markdown += `---\n\n`;
    }
  });

  return markdown;
};

// 메인 실행 함수
const main = () => {
  const rootDir = __dirname;
  const readmeDir = path.join(rootDir, 'README');
  
  // README 폴더 생성 (없으면 생성)
  if (!fs.existsSync(readmeDir)) {
    fs.mkdirSync(readmeDir, { recursive: true });
    console.log('README 폴더를 생성했습니다.\n');
  }

  const folders = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .filter(item => {
      // CHAPTER#_MOVIE# 형식의 폴더만 처리 (README 폴더 제외)
      return /^\d+_\d+e?$/.test(item.name);
    })
    .map(item => ({
      name: item.name,
      path: path.join(rootDir, item.name)
    }))
    .sort((a, b) => {
      // 폴더명으로 정렬 (01_01, 01_02, ... 순서)
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

  console.log(`총 ${folders.length}개의 폴더를 처리합니다...\n`);

  const markdownFiles = [];

  folders.forEach(folder => {
    const markdownFileName = `${folder.name}.md`;
    const markdownPath = path.join(readmeDir, markdownFileName);
    const markdown = generateMarkdown(folder.path, folder.name);
    
    fs.writeFileSync(markdownPath, markdown, 'utf8');
    markdownFiles.push({
      name: folder.name,
      fileName: markdownFileName,
      folderInfo: parseFolderName(folder.name)
    });
    console.log(`✓ ${markdownFileName} 생성 완료`);
  });

  // 인덱스 파일 생성
  generateIndex(readmeDir, markdownFiles);

  console.log(`\n모든 문서 생성이 완료되었습니다!`);
  console.log(`문서 위치: ${readmeDir}`);
};

// 인덱스 파일 생성 함수
const generateIndex = (readmeDir, markdownFiles) => {
  let indexContent = `# JavaScript Essential Training - 코드 문서\n\n`;
  indexContent += `이 폴더에는 각 강의 챕터의 코드 파일들이 정리되어 있습니다.\n\n`;
  indexContent += `---\n\n`;
  indexContent += `## 목차\n\n`;

  // 챕터별로 그룹화
  const chapters = {};
  markdownFiles.forEach(file => {
    if (file.folderInfo) {
      const chapter = file.folderInfo.chapter;
      if (!chapters[chapter]) {
        chapters[chapter] = [];
      }
      chapters[chapter].push(file);
    }
  });

  // 챕터별로 정렬하여 출력
  Object.keys(chapters).sort((a, b) => parseInt(a) - parseInt(b)).forEach(chapter => {
    indexContent += `### Chapter ${chapter}\n\n`;
    chapters[chapter].forEach(file => {
      const link = `[${file.name}](./${file.fileName})`;
      const endState = file.folderInfo.isEndState ? ' *(End State)*' : '';
      indexContent += `- ${link} - Movie ${file.folderInfo.movie}${endState}\n`;
    });
    indexContent += `\n`;
  });

  indexContent += `---\n\n`;
  indexContent += `*총 ${markdownFiles.length}개의 문서가 생성되었습니다.*\n`;

  const indexPath = path.join(readmeDir, 'README.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`\n✓ README/README.md (인덱스) 생성 완료`);
};

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { generateMarkdown, getAllFiles };

