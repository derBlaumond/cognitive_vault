# LinkedIn Learning Transcript Downloader

LinkedIn Learning 강의의 transcript를 자동으로 다운로드하는 도구입니다.

## 설치

자동화 스크립트(방법 2)를 사용하는 경우에만 필요합니다:

```bash
npm install
```

브라우저 콘솔 스크립트(방법 1)는 설치가 필요 없습니다.

## 사용 방법

두 가지 방법을 제공합니다:

### 방법 1: 브라우저 콘솔 스크립트 (간단한 방법) ⭐ 추천

각 강의 페이지에서 직접 실행하는 방법입니다. 설치가 필요 없고 가장 간단합니다.

1. LinkedIn Learning 강의 페이지를 엽니다
2. F12를 눌러 개발자 도구를 엽니다
3. Console 탭으로 이동합니다
4. `browser-console-script.js` 파일의 내용을 복사하여 붙여넣고 Enter를 누릅니다
5. Transcript가 자동으로 추출되어 다운로드됩니다

**장점:**
- 설치 불필요
- 각 강의마다 즉시 실행 가능
- LinkedIn Learning 웹사이트 구조 변경에 더 유연하게 대응 가능

**단점:**
- 각 강의마다 수동으로 실행해야 함 (100개 강의면 100번 실행)

### 방법 2: 자동화 스크립트 (대량 다운로드용)

여러 강의를 한 번에 다운로드하는 방법입니다.

#### 1. 강의 URL 목록 준비

`urls.txt` 파일을 생성하고 각 줄에 강의 URL을 입력하세요:

```
https://www.linkedin.com/learning/javascript-essential-training/introduction-to-javascript
https://www.linkedin.com/learning/javascript-essential-training/variables-and-data-types
https://www.linkedin.com/learning/javascript-essential-training/functions
```

`urls.txt.example` 파일을 참고하세요.

#### 2. 패키지 설치

```bash
npm install
```

#### 3. LinkedIn Learning에 로그인

브라우저에서 LinkedIn Learning에 로그인되어 있어야 합니다.

#### 4. 스크립트 실행

```bash
node download-transcripts.js
```

스크립트가 실행되면:
- 브라우저가 자동으로 열립니다 (headless: false로 설정되어 있음)
- 각 강의 페이지에 접속하여 transcript를 추출합니다
- `transcripts/` 폴더에 텍스트 파일로 저장합니다

## 출력 형식

각 transcript는 다음 형식으로 저장됩니다:

```
강의 제목: [강의 제목]
URL: [강의 URL]

================================================================================

[Transcript 내용]
```

파일명 형식: `001_[강의제목].txt`

## 설정 변경

`download-transcripts.js` 파일의 `CONFIG` 객체에서 설정을 변경할 수 있습니다:

- `urlsFile`: URL 목록 파일명 (기본값: 'urls.txt')
- `outputDir`: 출력 폴더명 (기본값: 'transcripts')
- `delayBetweenRequests`: 요청 간 딜레이 (밀리초, 기본값: 2000)
- `headless`: 브라우저를 숨길지 여부 (기본값: false, 로그인 필요시 false 권장)
- `timeout`: 페이지 로딩 타임아웃 (밀리초, 기본값: 30000)

## 주의사항

⚠️ **중요**: 
- LinkedIn Learning의 이용약관을 준수하세요
- 개인 학습 목적으로만 사용하세요
- 과도한 요청으로 인한 계정 제재를 피하기 위해 요청 간 딜레이를 두었습니다
- LinkedIn Learning의 웹사이트 구조가 변경되면 스크립트가 작동하지 않을 수 있습니다

## 문제 해결

### Transcript 버튼을 찾을 수 없는 경우

LinkedIn Learning의 웹사이트 구조가 변경되었을 수 있습니다. 다음을 확인하세요:

1. 브라우저가 열린 상태에서 수동으로 transcript 버튼을 찾아보세요
2. 개발자 도구(F12)를 열어서 transcript 버튼의 selector를 확인하세요
3. `download-transcripts.js`의 `transcriptSelectors` 배열에 새로운 selector를 추가하세요

### 로그인이 필요한 경우

스크립트 실행 전에 브라우저에서 수동으로 LinkedIn Learning에 로그인하세요. 
`headless: false`로 설정되어 있으면 브라우저가 보이므로 수동 로그인이 가능합니다.

### 일부 강의만 실패하는 경우

- 해당 강의에 transcript가 없을 수 있습니다
- 네트워크 오류일 수 있습니다
- `download-results.json` 파일에서 실패한 강의 목록을 확인할 수 있습니다

## 추천 워크플로우

100개의 강의가 있다면:

1. **브라우저 콘솔 스크립트 사용** (방법 1)을 추천합니다
   - 각 강의를 보면서 동시에 transcript를 다운로드할 수 있습니다
   - 설치나 설정이 필요 없습니다
   - 가장 안정적이고 간단합니다

2. **자동화 스크립트** (방법 2)는 다음 경우에 유용합니다:
   - 이미 모든 강의를 시청했고 transcript만 필요할 때
   - URL 목록을 이미 가지고 있을 때
   - 완전 자동화가 필요할 때

## 대안 방법

### 브라우저 확장 프로그램 사용

일부 브라우저 확장 프로그램을 사용할 수도 있습니다:
- Chrome/Edge: "Download Transcript" 같은 확장 프로그램 검색

### 수동 다운로드

각 강의 페이지에서:
1. Transcript 버튼 클릭
2. 내용 복사
3. 텍스트 파일로 저장

## 라이선스

이 스크립트는 개인 학습 목적으로만 사용하세요. LinkedIn Learning의 이용약관을 준수해야 합니다.

