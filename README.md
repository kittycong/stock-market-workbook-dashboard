# 마켓 워크북 | Market Workbook

Excel/Outlook 스타일의 종목 대시보드입니다.

## 실행

```powershell
npm start
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다.

## 데이터

- 실시간 가격/차트: Yahoo Finance chart endpoint
- 묶음 시세: `/api/quotes`
- 종목 프로필/퀀트: `/api/profile`
  - 미국 종목: Yahoo chart + Yahoo quote page에서 시총, PER, 목표가, 애널리스트 판독 보강
  - 국내 종목: Yahoo chart + Naver Finance 기업개요/시총/순위/PER 보강
  - 전 종목 공통: 1년 가격 흐름으로 총점, 모멘텀, 가치, 리스크, 변동성, 모델 목표범위 계산
- 뉴스: Google News RSS / Naver News RSS
- 코스피 거래상위: Naver Finance
- 연기금 수급: Judal 참고 테이블
- API 호출 실패 시 앱 내부 샘플 데이터로 폴백합니다.

## 새로고침 정책

- 가격/차트/뉴스: 60초마다 자동 갱신
- 프로필/퀀트/코스피/연기금: 5분마다 자동 갱신
- 서버 측 차트 캐시: 1일 차트 25초, 장기 차트 5분
- Yahoo quote page 보강 캐시: 30분

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

현재 공개 배포 URL:

https://nvda-ceo-servicenow-now-2-1.vercel.app
