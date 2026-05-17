# SY Market Workbook

Excel/Outlook 스타일의 종목 대시보드입니다.

## 실행

```powershell
npm start
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다.

## 데이터

- 차트: Yahoo Finance chart endpoint
- 뉴스: Google News RSS
- API 호출 실패 시 앱 내부 샘플 데이터로 폴백합니다.

매수/매도 추천이 아닌 참고용 화면입니다.

## 공개 배포

Vercel CLI가 설치된 환경에서:

```powershell
vercel deploy
```

프로덕션 배포:

```powershell
vercel deploy --prod
```

이 프로젝트는 `api/chart.js`, `api/news.js`, `api/profile.js` 서버리스 함수와 `vercel.json`을 포함합니다.

현재 이 Codex 환경에는 `git`, `gh`, `vercel`, `npx`가 없어 공개 URL 생성은 로컬에서 막혀 있습니다.
