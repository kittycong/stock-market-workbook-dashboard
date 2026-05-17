const categories = [
  "AI / 빅테크 / 클라우드",
  "반도체 / AI 인프라",
  "기업 SW / SaaS / 보안",
  "산업 / 국방 / 인프라",
  "소비 / 플랫폼",
  "금융 / 크립토 / 데이터",
  "헬스케어 / 유틸리티",
  "ETF / 자산배분",
];

const baseHoldings = [
  ["NVDA", "엔비디아", "AI 반도체 및 가속 컴퓨팅 설계", "AI / 빅테크 / 클라우드", "core", 5],
  ["MSFT", "마이크로소프트", "클라우드 인프라 및 AI 소프트웨어", "AI / 빅테크 / 클라우드", "core", 5],
  ["AAPL", "애플", "모바일 하드웨어 및 서비스 생태계", "AI / 빅테크 / 클라우드", "core", 4],
  ["AMZN", "아마존", "글로벌 이커머스 및 AWS 클라우드", "AI / 빅테크 / 클라우드", "core", 5],
  ["GOOGL", "알파벳", "검색 엔진, 디지털 광고 및 클라우드", "AI / 빅테크 / 클라우드", "core", 5],
  ["AVGO", "브로드컴", "통신 네트워크 및 맞춤형 반도체 설계", "반도체 / AI 인프라", "core", 5],
  ["TXN", "텍사스 인스트루먼트", "아날로그 및 임베디드 반도체", "반도체 / AI 인프라", "defensive", 3],
  ["SNPS", "시노프시스", "반도체 설계 자동화(EDA) 소프트웨어", "반도체 / AI 인프라", "growth", 4],
  ["CDNS", "캐던스 디자인 시스템즈", "반도체 설계 및 검증 소프트웨어", "반도체 / AI 인프라", "growth", 4],
  ["KLAC", "KLA", "반도체 제조 공정 검사 및 계측 장비", "반도체 / AI 인프라", "growth", 3],
  ["DELL", "델", "PC, 서버 및 IT 인프라 솔루션", "반도체 / AI 인프라", "growth", 3],
  ["JBL", "자빌", "전자제품 제조 서비스 및 공급망 솔루션", "반도체 / AI 인프라", "growth", 3],
  ["ORCL", "오라클", "기업용 데이터베이스 및 클라우드 인프라", "기업 SW / SaaS / 보안", "core", 4],
  ["CRM", "세일즈포스", "클라우드 기반 고객 관계 관리(CRM)", "기업 SW / SaaS / 보안", "growth", 4],
  ["ADBE", "어도비", "창작 소프트웨어 및 디지털 마케팅", "기업 SW / SaaS / 보안", "growth", 4],
  ["NOW", "서비스나우", "IT 서비스 및 워크플로우 자동화", "기업 SW / SaaS / 보안", "growth", 5],
  ["WDAY", "워크데이", "클라우드 기반 기업 인사 및 재무 관리", "기업 SW / SaaS / 보안", "growth", 3],
  ["FFIV", "F5", "멀티 클라우드 애플리케이션 보안 및 전송", "기업 SW / SaaS / 보안", "growth", 2],
  ["ETN", "이튼", "전력 관리 솔루션 및 에너지 인프라", "산업 / 국방 / 인프라", "core", 4],
  ["MSI", "모토로라 솔루션", "공공 안전 통신 장비 및 시스템", "산업 / 국방 / 인프라", "defensive", 3],
  ["WM", "웨이스트 매니지먼트", "종합 폐기물 처리 및 재활용", "산업 / 국방 / 인프라", "defensive", 3],
  ["TDG", "트랜스디그름", "항공우주 및 방산용 특수 부품", "산업 / 국방 / 인프라", "growth", 3],
  ["BA", "보잉", "상업용 항공기 제조 및 방위산업", "산업 / 국방 / 인프라", "growth", 2],
  ["AXON", "액슨", "스마트 무기 및 법 집행용 보안 기기", "산업 / 국방 / 인프라", "growth", 4],
  ["IEX", "IDEX", "특수 펌프 및 정밀 유체 기기 제조", "산업 / 국방 / 인프라", "defensive", 2],
  ["COST", "코스트코", "회원제 창고형 할인 매장", "소비 / 플랫폼", "defensive", 4],
  ["HD", "홈디포", "주택 개량 용품 및 건축 자재 소매", "소비 / 플랫폼", "defensive", 3],
  ["NFLX", "넷플릭스", "구독형 비디오 스트리밍 플랫폼", "소비 / 플랫폼", "growth", 3],
  ["UBER", "우버", "글로벌 승차 공유 및 모빌리티 플랫폼", "소비 / 플랫폼", "growth", 3],
  ["CVNA", "카바나", "온라인 중고차 거래 플랫폼", "소비 / 플랫폼", "volatile", 2],
  ["NWSA", "뉴스 코프", "글로벌 뉴스 미디어 및 정보 서비스", "소비 / 플랫폼", "defensive", 2],
  ["ICE", "인터컨티넨탈 익스체인지", "글로벌 금융 거래소 및 데이터", "금융 / 크립토 / 데이터", "core", 3],
  ["MSTR", "마이크로스트래티지", "기업용 SW 및 비트코인 투자", "금융 / 크립토 / 데이터", "volatile", 3],
  ["COIN", "코인베이스", "암호화폐 거래 및 핀테크 플랫폼", "금융 / 크립토 / 데이터", "volatile", 3],
  ["MARA", "MARA 홀딩스", "디지털 자산 및 비트코인 채굴", "금융 / 크립토 / 데이터", "volatile", 2],
  ["DVA", "다비타", "종합 신장 투석 및 만성 질환 관리 서비스", "헬스케어 / 유틸리티", "defensive", 2],
  ["WST", "웨스트 파마슈티컬", "주사용 의약품 포장 및 전달 시스템", "헬스케어 / 유틸리티", "defensive", 2],
  ["XEL", "엑셀 에너지", "전기, 가스 유틸리티 및 신재생 에너지", "헬스케어 / 유틸리티", "defensive", 2],
  ["VTI", "뱅가드 종합 주식 시장", "미국 주식 시장 전체 분산 투자", "ETF / 자산배분", "etf", 5],
  ["VOO", "뱅가드 S&P 500", "미국 우량 대형주 500개 집중 투자", "ETF / 자산배분", "etf", 5],
  ["IEMG", "MSCI 신흥시장", "주요 신흥국 주식 시장 분산 투자", "ETF / 자산배분", "etf", 3],
  ["XLK", "기술 섹터 선택", "S&P 500 내 핵심 기술 기업 집중 투자", "ETF / 자산배분", "etf", 4],
  ["EFA", "MSCI EAFE", "미국과 캐나다 제외 선진국 시장 투자", "ETF / 자산배분", "etf", 3],
  ["IWB", "러셀 1000", "미국 주식 시장 상위 1000개 대형주 투자", "ETF / 자산배분", "etf", 4],
  ["RSP", "S&P 500 균등 가중", "S&P 500 종목을 동일 비율로 분산", "ETF / 자산배분", "etf", 4],
  ["XLI", "산업 섹터 SPDR", "미국 항공, 국방, 제조 등 산업재 투자", "ETF / 자산배분", "etf", 3],
  ["GOVT", "미국 국채", "다양한 만기의 미국 국채 분산 투자", "ETF / 자산배분", "etf", 4],
  ["COMT", "GSCI 원자재", "원유, 금속, 농산물 등 광범위한 원자재 투자", "ETF / 자산배분", "etf", 3],
  ["000660.KS", "SK하이닉스", "HBM 및 메모리 반도체", "반도체 / AI 인프라", "growth", 5],
].map(([ticker, company, description, category, risk, score]) => ({
  ticker,
  company,
  description,
  category,
  risk,
  score,
}));

let holdings = [];

const riskLabels = {
  core: "코어",
  growth: "성장",
  defensive: "방어",
  volatile: "고변동",
  etf: "ETF",
};

const newsItems = [
  ["09:05", "NVDA", "AI칩", "차세대 가속 컴퓨팅 수요가 데이터센터 투자 확대와 함께 재부각", "up"],
  ["09:18", "MSFT", "클라우드", "Azure AI 워크로드 증가 기대감으로 빅테크 코어 라인 주목", "up"],
  ["09:31", "NOW", "자동화", "로봇 운영 워크플로우와 ServiceNow 테마가 다시 관심권 진입", "up"],
  ["09:44", "AVGO", "반도체", "맞춤형 AI 반도체와 네트워크 칩 수요가 동반 부각", "up"],
  ["10:02", "SNPS", "EDA", "AI 칩 설계 증가로 EDA 소프트웨어 수요 전망 견조", "flat"],
  ["10:16", "ORCL", "클라우드", "기업 데이터베이스와 AI 인프라 계약 기대감 유지", "up"],
  ["10:28", "MSTR", "비트코인", "디지털 자산 변동성 확대에 고베타 종목 등락 주의", "down"],
  ["10:41", "COIN", "크립토", "거래대금 회복 기대와 규제 뉴스가 동시에 가격 변동성 자극", "flat"],
  ["11:03", "ETN", "전력", "데이터센터 전력 인프라 투자 테마로 산업재 관심 지속", "up"],
  ["11:22", "AXON", "공공안전", "법 집행 보안 기기와 클라우드 증거 관리 수요 기대", "up"],
  ["12:08", "COST", "소비방어", "방어형 소비주 선호 속 회원제 모델 안정성 재평가", "flat"],
  ["12:36", "GOVT", "국채", "포트폴리오 변동성 방어 수단으로 국채 ETF 체크", "flat"],
  ["13:10", "ADBE", "소프트웨어", "AI 창작 도구 수익화 기대와 밸류에이션 부담이 공존", "flat"],
  ["13:32", "CRM", "SaaS", "기업용 AI 에이전트와 고객 데이터 플랫폼 테마 편입", "up"],
  ["14:05", "MARA", "채굴", "비트코인 가격 민감도 큰 종목으로 리스크 관리 필요", "down"],
  ["14:38", "VOO", "ETF", "대형주 분산 코어 포지션으로 장기 방어 라인 유지", "flat"],
].map(([time, ticker, type, headline, impact]) => ({ time, ticker, type, headline, impact }));

const safeStore = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Some file:// browsers block localStorage. The app still works in memory.
    }
  },
};

const state = {
  category: "전체",
  risk: "all",
  query: "",
  selectedTicker: "NVDA",
  chartRange: "1D",
  newsTicker: "all",
  liveChart: null,
  liveQuotes: {},
  liveQuoteErrors: {},
  liveQuotesFetchedAt: null,
  liveNews: null,
  liveProfile: null,
  companyInfo: null,
  kospiQuant: null,
  fundFlow: null,
  fundFlowType: "fundBuy",
  newsSource: "google",
  signalView: "strong-buy",
  liveMode: location.protocol.startsWith("http"),
  customHoldings: safeStore.get("custom-holdings", []),
  starred: new Set(safeStore.get("portfolio-stars", [])),
  notes: safeStore.get("portfolio-notes", []),
};

const board = document.querySelector("#kanbanBoard");
const tabs = document.querySelector("#categoryTabs");
const statsRow = document.querySelector("#statsRow");
const searchInput = document.querySelector("#searchInput");
const riskSelect = document.querySelector("#riskSelect");
const statusText = document.querySelector("#statusText");
const tickerTape = document.querySelector("#tickerTape");
const watchRows = document.querySelector("#watchRows");
const watchCount = document.querySelector("#watchCount");
const chatBody = document.querySelector("#chatBody");
const noteForm = document.querySelector("#noteForm");
const noteInput = document.querySelector("#noteInput");
const rowNumbers = document.querySelector(".row-numbers");
const chartCanvas = document.querySelector("#priceChart");
const largeChartCanvas = document.querySelector("#largePriceChart");
const chartTitle = document.querySelector("#chartTitle");
const chartSubtitle = document.querySelector("#chartSubtitle");
const chartMetrics = document.querySelector("#chartMetrics");
const modalChartTitle = document.querySelector("#modalChartTitle");
const modalChartSubtitle = document.querySelector("#modalChartSubtitle");
const modalChartMetrics = document.querySelector("#modalChartMetrics");
const chartTickerSelect = document.querySelector("#chartTickerSelect");
const chartRangeSelect = document.querySelector("#chartRangeSelect");
const newsSourceSelect = document.querySelector("#newsSourceSelect");
const newsTickerSelect = document.querySelector("#newsTickerSelect");
const newsRows = document.querySelector("#newsRows");
const chartModal = document.querySelector("#chartModal");
const expandChartButton = document.querySelector("#expandChartButton");
const closeChartButton = document.querySelector("#closeChartButton");
const addStockModal = document.querySelector("#addStockModal");
const openAddStockButton = document.querySelector("#openAddStockButton");
const closeAddStockButton = document.querySelector("#closeAddStockButton");
const addStockForm = document.querySelector("#addStockForm");
const newTickerInput = document.querySelector("#newTickerInput");
const newCompanyInput = document.querySelector("#newCompanyInput");
const newCategoryInput = document.querySelector("#newCategoryInput");
const newRiskInput = document.querySelector("#newRiskInput");
const newDescriptionInput = document.querySelector("#newDescriptionInput");
const clearCustomStocksButton = document.querySelector("#clearCustomStocksButton");
const profileTitle = document.querySelector("#profileTitle");
const profileSubtitle = document.querySelector("#profileSubtitle");
const profileStatus = document.querySelector("#profileStatus");
const totalScore = document.querySelector("#totalScore");
const scoreBars = document.querySelector("#scoreBars");
const profileFacts = document.querySelector("#profileFacts");
const profileNotes = document.querySelector("#profileNotes");
const technicalSubtitle = document.querySelector("#technicalSubtitle");
const customQuoteRows = document.querySelector("#customQuoteRows");
const indicatorBlocks = document.querySelector("#indicatorBlocks");
const candlestickRows = document.querySelector("#candlestickRows");
const timeframeChecks = [...document.querySelectorAll(".tf-check")];
const signalSheetPanel = document.querySelector("#signalSheetPanel");
const signalSheetTitle = document.querySelector("#signalSheetTitle");
const signalSheetSubtitle = document.querySelector("#signalSheetSubtitle");
const signalSheetGrid = document.querySelector("#signalSheetGrid");
const signalSheetControls = document.querySelector(".signal-sheet-controls");
const kospiPanel = document.querySelector("#kospiPanel");
const kospiSubtitle = document.querySelector("#kospiSubtitle");
const kospiRows = document.querySelector("#kospiRows");
const refreshKospiButton = document.querySelector("#refreshKospiButton");
const fundFlowPanel = document.querySelector("#fundFlowPanel");
const fundFlowTitle = document.querySelector("#fundFlowTitle");
const fundFlowSubtitle = document.querySelector("#fundFlowSubtitle");
const fundFlowRows = document.querySelector("#fundFlowRows");
const fundFlowControls = document.querySelector(".fund-flow-controls");
const refreshFundFlowButton = document.querySelector("#refreshFundFlowButton");

function seededMove(ticker) {
  const seed = ticker.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const value = ((seed % 41) - 13) / 10;
  return value.toFixed(1);
}

function normalizeTicker(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "");
}

function rebuildHoldings() {
  const map = new Map();
  [...baseHoldings, ...state.customHoldings].forEach((item) => {
    if (!item?.ticker) return;
    map.set(normalizeTicker(item.ticker), {
      ticker: normalizeTicker(item.ticker),
      company: item.company || item.ticker,
      description: item.description || "사용자 추가 종목",
      category: categories.includes(item.category) ? item.category : "AI / 빅테크 / 클라우드",
      risk: riskLabels[item.risk] ? item.risk : "growth",
      score: Number(item.score || 3),
      custom: Boolean(item.custom),
    });
  });
  holdings = [...map.values()];
}

function populateAddStockCategories() {
  newCategoryInput.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function seededPriceSeries(ticker, range) {
  const seed = ticker.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const lengthByRange = { "1D": 28, "5D": 36, "1M": 44, "6M": 56 };
  const length = lengthByRange[range] || 28;
  const base = 80 + (seed % 180);
  let value = base;
  return Array.from({ length }, (_, index) => {
    const wave = Math.sin((index + seed) / 3.4) * (1.8 + (seed % 5) * 0.18);
    const drift = (seed % 2 === 0 ? 0.16 : -0.05) * index;
    const noise = Math.cos((index * seed) / 17) * 0.75;
    value = base + drift + wave + noise;
    return Number(value.toFixed(2));
  });
}

function signalClass(signal) {
  if (signal.includes("적극 매수")) return "signal-strong-buy";
  if (signal.includes("매수")) return "signal-buy";
  if (signal.includes("적극 매도")) return "signal-strong-sell";
  if (signal.includes("매도")) return "signal-sell";
  return "signal-neutral";
}

function seededSignal(ticker, timeframe, type = "summary") {
  const seed = `${ticker}-${timeframe}-${type}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const signals = ["적극 매도", "매도", "중립", "매수", "적극 매수"];
  return signals[seed % signals.length];
}

function aggregateTechnicalSignal(ticker) {
  const frames = ["5m", "15m", "1h", "1d"];
  const values = frames.map((frame) => seededSignal(ticker, frame, "summary"));
  const score = values.reduce((sum, signal) => {
    if (signal === "적극 매수") return sum + 2;
    if (signal === "매수") return sum + 1;
    if (signal === "매도") return sum - 1;
    if (signal === "적극 매도") return sum - 2;
    return sum;
  }, 0);
  const summary = score >= 3 ? "적극 매수" : score <= -3 ? "적극 매도" : score > 0 ? "매수" : score < 0 ? "매도" : "중립";
  return { summary, score, frames: values };
}

function sma(values, period) {
  if (values.length < period) return values.at(-1) || 0;
  return values.slice(-period).reduce((sum, value) => sum + value, 0) / period;
}

function rsi(values, period = 14) {
  if (values.length <= period) return 50;
  const slice = values.slice(-period - 1);
  let gains = 0;
  let losses = 0;
  for (let i = 1; i < slice.length; i += 1) {
    const change = slice[i] - slice[i - 1];
    if (change >= 0) gains += change;
    else losses -= change;
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function indicatorSignal(name, value) {
  if (name === "RSI(14)") {
    if (value > 70) return "과량매입";
    if (value < 30) return "과량매도";
    return value >= 50 ? "매수" : "매도";
  }
  if (name.includes("MACD") || name.includes("ADX") || name === "ROC") return value >= 0 ? "매수" : "매도";
  if (name === "ATR(14)") return "변동성 높음";
  return value >= 50 ? "매수" : "매도";
}

function detectCandles(points, ticker) {
  const latest = points.at(-1);
  const prev = points.at(-2);
  const fallback = [
    ["1D", "★★☆", seededSignal(ticker, "1D", "candle").includes("매수") ? "Bullish Engulfing" : "Doji Star Bearish"],
    ["1W", "★★★", seededSignal(ticker, "1W", "candle").includes("매수") ? "Three Outside Up" : "Deliberation Bearish"],
    ["1M", "★★☆", seededSignal(ticker, "1M", "candle").includes("매수") ? "Harami Bullish" : "Harami Bearish"],
  ];
  if (!latest || !prev || !Number.isFinite(latest.open) || !Number.isFinite(prev.open)) return fallback;
  const body = Math.abs(latest.close - latest.open);
  const range = Math.max(0.0001, latest.high - latest.low);
  const isDoji = body / range < 0.12;
  const bullishEngulfing = latest.close > latest.open && prev.close < prev.open && latest.close > prev.open && latest.open < prev.close;
  const bearishEngulfing = latest.close < latest.open && prev.close > prev.open && latest.open > prev.close && latest.close < prev.open;
  if (bullishEngulfing) return [["현재", "★★★", "Bullish Engulfing"], ...fallback.slice(1)];
  if (bearishEngulfing) return [["현재", "★★★", "Bearish Engulfing"], ...fallback.slice(1)];
  if (isDoji) return [["현재", "★★☆", latest.close >= latest.open ? "Doji Star Bullish" : "Doji Star Bearish"], ...fallback.slice(1)];
  return fallback;
}

function formatClock(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

function formatQuotePrice(quote, fallback = "-") {
  if (!quote || !Number.isFinite(quote.price)) return fallback;
  const isKrw = quote.currency === "KRW" || quote.ticker?.endsWith(".KS") || quote.ticker?.endsWith(".KQ");
  const symbol = isKrw ? "₩" : "$";
  return `${symbol}${quote.price.toLocaleString(undefined, { maximumFractionDigits: isKrw ? 0 : 2 })}`;
}

function formatQuoteMove(quote, fallbackTicker = "") {
  if (!quote || !Number.isFinite(quote.changeRate)) return { label: "연결 대기", tone: "" };
  const signed = quote.changeRate >= 0 ? "+" : "";
  return {
    label: `${signed}${quote.changeRate.toFixed(2)}%`,
    tone: quote.changeRate < 0 ? "down" : "up",
  };
}

async function loadLiveQuotes(tickers = holdings.map((item) => item.ticker)) {
  if (!state.liveMode) {
    renderTickerTape();
    renderBoard();
    return;
  }
  try {
    const uniqueTickers = [...new Set(tickers)].slice(0, 60);
    const payload = await fetchJson(`/api/quotes?tickers=${encodeURIComponent(uniqueTickers.join(","))}`);
    state.liveQuotes = { ...state.liveQuotes, ...(payload.quotes || {}) };
    state.liveQuoteErrors = payload.errors || {};
    state.liveQuotesFetchedAt = payload.fetchedAt;
    renderTickerTape();
    renderBoard();
    const failed = Object.keys(state.liveQuoteErrors).length;
    statusText.textContent = failed
      ? `실시간 가격 ${Object.keys(payload.quotes || {}).length}개 연결 · 실패 ${failed}개`
      : `실시간 가격 ${Object.keys(payload.quotes || {}).length}개 연결 완료`;
  } catch (error) {
    state.liveQuoteErrors = { all: error.message };
    renderTickerTape();
    renderBoard();
    statusText.textContent = `실시간 가격 묶음 호출 실패 · ${error.message}`;
  }
}

async function loadLiveChart() {
  if (!state.liveMode) {
    state.liveChart = null;
    renderChart();
    return;
  }
  try {
    state.liveChart = await fetchJson(`/api/chart?ticker=${encodeURIComponent(state.selectedTicker)}&range=${encodeURIComponent(state.chartRange)}`);
    renderChart();
  } catch (error) {
    state.liveChart = null;
    renderChart();
    statusText.textContent = `실시간 차트 실패 · 샘플 차트 표시 (${error.message})`;
  }
}

async function loadLiveNews() {
  if (!state.liveMode) {
    state.liveNews = null;
    renderNews();
    return;
  }
  const ticker = state.newsTicker === "all" ? state.selectedTicker : state.newsTicker;
  try {
    state.liveNews = await fetchJson(`/api/news?ticker=${encodeURIComponent(ticker)}&source=${encodeURIComponent(state.newsSource)}`);
    renderNews();
  } catch (error) {
    state.liveNews = null;
    renderNews();
    statusText.textContent = `실시간 뉴스 실패 · 샘플 뉴스 표시 (${error.message})`;
  }
}

async function loadProfile() {
  if (!state.liveMode) {
    state.liveProfile = null;
    renderProfile();
    return;
  }
  try {
    state.liveProfile = await fetchJson(`/api/profile?ticker=${encodeURIComponent(state.selectedTicker)}`);
    await loadCompanyInfo();
    renderProfile();
  } catch (error) {
    state.liveProfile = null;
    renderProfile();
    profileStatus.textContent = `데이터 상태: 프로필 실패 (${error.message})`;
  }
}

async function loadCompanyInfo() {
  const match = state.selectedTicker.match(/^(\d{6})\.K[QS]$/);
  if (!state.liveMode || !match) {
    state.companyInfo = null;
    return;
  }
  try {
    state.companyInfo = await fetchJson(`/api/company-info?code=${match[1]}`);
  } catch {
    state.companyInfo = null;
  }
}

async function loadKospiQuant() {
  if (!state.liveMode) {
    renderKospiQuant();
    return;
  }
  try {
    state.kospiQuant = await fetchJson("/api/kospi-quant");
    renderKospiQuant();
  } catch (error) {
    state.kospiQuant = null;
    renderKospiQuant();
    kospiSubtitle.textContent = `네이버 금융 호출 실패 · ${error.message}`;
  }
}

async function loadFundFlow() {
  if (!state.liveMode) {
    renderFundFlow();
    return;
  }
  try {
    state.fundFlow = await fetchJson(`/api/fund-flow?type=${encodeURIComponent(state.fundFlowType)}`);
    renderFundFlow();
  } catch (error) {
    state.fundFlow = null;
    renderFundFlow();
    fundFlowSubtitle.textContent = `주달 호출 실패 · ${error.message}`;
  }
}

function getFilteredHoldings() {
  return holdings.filter((item) => {
    const query = state.query.trim().toLowerCase();
    const haystack = [item.ticker, item.company, item.description, item.category, riskLabels[item.risk]]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = state.category === "전체" || item.category === state.category;
    const matchesRisk = state.risk === "all" || item.risk === state.risk;
    return matchesQuery && matchesCategory && matchesRisk;
  });
}

function renderRows() {
  rowNumbers.innerHTML = Array.from({ length: 42 }, (_, index) => `<span>${index + 1}</span>`).join("");
}

function renderTickerTape() {
  const tickers = ["NVDA", "MSFT", "AVGO", "NOW", "ORCL", "SNPS", "COST", "MSTR", "VOO", "GOVT"];
  tickerTape.innerHTML = tickers
    .map((ticker) => {
      const quote = state.liveQuotes[ticker];
      const move = formatQuoteMove(quote, ticker);
      const direction = move.tone === "down" ? "down" : "";
      return `<div class="ticker-pill ${direction}">$${ticker}<em>${move.label}</em></div>`;
    })
    .join("");
}

function renderSelectors() {
  rebuildHoldings();
  const sorted = [...holdings].sort((a, b) => a.ticker.localeCompare(b.ticker));
  chartTickerSelect.innerHTML = sorted
    .map((item) => `<option value="${item.ticker}">$${item.ticker} · ${item.company}</option>`)
    .join("");
  const newsTickers = [...new Set(newsItems.map((item) => item.ticker))].sort();
  newsTickerSelect.innerHTML = [
    `<option value="all">전체 뉴스</option>`,
    ...newsTickers.map((ticker) => `<option value="${ticker}">$${ticker}</option>`),
  ].join("");
  chartTickerSelect.value = state.selectedTicker;
  chartRangeSelect.value = state.chartRange;
  newsSourceSelect.value = state.newsSource;
  newsTickerSelect.value = state.newsTicker;
}

function getChartSnapshot() {
  const hasMatchingLiveChart = state.liveChart?.ticker === state.selectedTicker && state.liveChart?.range === state.chartRange;
  const liveOhlc = hasMatchingLiveChart ? state.liveChart.points?.filter((point) => Number.isFinite(point.close)) : null;
  const livePoints = liveOhlc?.map((point) => point.close);
  const series = livePoints?.length ? livePoints : seededPriceSeries(state.selectedTicker, state.chartRange);
  const ohlc = liveOhlc?.length
    ? liveOhlc
    : series.map((close, index) => ({
        open: index ? series[index - 1] : close * 0.995,
        high: close * 1.006,
        low: close * 0.994,
        close,
      }));
  const min = Math.min(...series);
  const max = Math.max(...series);
  const first = hasMatchingLiveChart ? state.liveChart.previousClose || series[0] : series[0];
  const last = hasMatchingLiveChart ? state.liveChart.regularMarketPrice || series[series.length - 1] : series[series.length - 1];
  const change = ((last - first) / first) * 100;
  const holding = holdings.find((item) => item.ticker === state.selectedTicker);
  return { series, ohlc, min, max, first, last, change, holding, hasMatchingLiveChart };
}

function drawPriceChart(canvas, snapshot, options = {}) {
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(320, Math.floor(rect.width * ratio));
  canvas.height = Math.max(180, Math.floor(rect.height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 18, right: 44, bottom: 30, left: 42 };
  const { series, min, max, change, last, hasMatchingLiveChart } = snapshot;
  const color = change >= 0 ? "#217246" : "#a63131";
  const xStep = (width - padding.left - padding.right) / (series.length - 1);
  const yScale = (height - padding.top - padding.bottom) / Math.max(1, max - min);

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "#e0e7ed";
  context.lineWidth = 1;
  context.font = "11px Malgun Gothic, Segoe UI, sans-serif";
  context.fillStyle = "#607181";
  for (let i = 0; i < 5; i += 1) {
    const y = padding.top + ((height - padding.top - padding.bottom) / 4) * i;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();
    const label = (max - ((max - min) / 4) * i).toFixed(0);
    context.fillText(label, width - padding.right + 8, y + 4);
  }

  context.beginPath();
  series.forEach((price, index) => {
    const x = padding.left + xStep * index;
    const y = height - padding.bottom - (price - min) * yScale;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.strokeStyle = color;
  context.lineWidth = 2.5;
  context.stroke();

  const gradient = context.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradient.addColorStop(0, change >= 0 ? "rgba(33, 114, 70, 0.22)" : "rgba(166, 49, 49, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.lineTo(width - padding.right, height - padding.bottom);
  context.lineTo(padding.left, height - padding.bottom);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();

  const lastX = padding.left + xStep * (series.length - 1);
  const lastY = height - padding.bottom - (last - min) * yScale;
  context.beginPath();
  context.arc(lastX, lastY, 4, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();

  context.fillStyle = "#607181";
  context.fillText(state.chartRange, padding.left, height - 10);
  context.fillText(hasMatchingLiveChart ? "Yahoo" : "샘플", width - padding.right - 34, height - 10);
  if (options.large) {
    context.fillStyle = "#14202b";
    context.font = "700 13px Malgun Gothic, Segoe UI, sans-serif";
    context.fillText(`$${state.selectedTicker}`, padding.left, 16);
  }
}

function metricsMarkup(snapshot) {
  const { last, change, max, min } = snapshot;
  const currency = state.liveChart?.currency === "KRW" || state.selectedTicker.endsWith(".KS") ? "₩" : "$";
  const formatPrice = (value) => `${currency}${value.toLocaleString(undefined, { maximumFractionDigits: currency === "₩" ? 0 : 2 })}`;
  return [
    ["현재가", formatPrice(last), change >= 0 ? "up" : "down"],
    ["변동률", `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`, change >= 0 ? "up" : "down"],
    ["고가", formatPrice(max), ""],
    ["저가", formatPrice(min), ""],
  ]
    .map(([label, value, tone]) => `<div class="metric ${tone}"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderChart() {
  const snapshot = getChartSnapshot();
  drawPriceChart(chartCanvas, snapshot);
  renderTechnical(snapshot);

  chartTitle.textContent = `$${state.selectedTicker} 차트`;
  chartSubtitle.textContent = `${snapshot.holding?.company || "선택 종목"} · ${state.chartRange} · ${snapshot.hasMatchingLiveChart ? "Yahoo Finance 실시간" : "샘플 가격 흐름"}`;
  chartMetrics.innerHTML = metricsMarkup(snapshot);

  if (chartModal.classList.contains("open")) {
    renderLargeChart();
  }
}

function renderTechnical(snapshot = getChartSnapshot()) {
  const selectedFrames = timeframeChecks.filter((input) => input.checked).map((input) => input.value);
  const rows = [state.selectedTicker, "NVDA", "MSFT", "000660.KS", "AVGO"]
    .filter((ticker, index, arr) => arr.indexOf(ticker) === index)
    .slice(0, 5);
  customQuoteRows.innerHTML = rows
    .map((ticker) => {
      const company = holdings.find((item) => item.ticker === ticker)?.company || ticker;
      const maCells = ["5m", "15m", "1h", "1d"].map((tf) => {
        const signal = selectedFrames.includes(tf) ? seededSignal(ticker, tf, "ma") : "-";
        return `<td class="${signalClass(signal)}">${signal}</td>`;
      });
      const indCells = ["5m", "15m", "1h", "1d"].map((tf) => {
        const signal = selectedFrames.includes(tf) ? seededSignal(ticker, tf, "indicator") : "-";
        return `<td class="${signalClass(signal)}">${signal}</td>`;
      });
      const summaryCells = ["5m", "15m", "1h", "1d"].map((tf) => {
        const signal = selectedFrames.includes(tf) ? seededSignal(ticker, tf, "summary") : "-";
        return `<td class="${signalClass(signal)}">${signal}</td>`;
      });
      return `
        <tr><td rowspan="3"><strong>$${ticker}</strong><br><span>${company}</span></td><td>이동평균:</td>${maCells.join("")}</tr>
        <tr><td>지표:</td>${indCells.join("")}</tr>
        <tr><td><strong>요약:</strong></td>${summaryCells.join("")}</tr>
      `;
    })
    .join("");

  const values = snapshot.series;
  const indicators = [
    ["RSI(14)", rsi(values, 14)],
    ["STOCH(9,6)", Math.min(100, Math.max(0, rsi(values, 9) + 8))],
    ["MACD(12,26)", sma(values, 12) - sma(values, 26)],
    ["ADX(14)", Math.abs(snapshot.change) * 3],
    ["CCI(14)", (snapshot.last - sma(values, 14)) * 4],
    ["ATR(14)", (snapshot.max - snapshot.min) / Math.max(1, values.length)],
    ["ROC", snapshot.change],
    ["Bull/Bear Power", snapshot.last - sma(values, 13)],
  ];
  const buyCount = indicators.filter(([name, value]) => indicatorSignal(name, value).includes("매수")).length;
  const sellCount = indicators.filter(([name, value]) => indicatorSignal(name, value).includes("매도")).length;
  const summary = buyCount > sellCount ? "적극 매수" : sellCount > buyCount ? "적극 매도" : "중립";
  indicatorBlocks.innerHTML = `
    <div class="indicator-mini">
      <table><thead><tr><th>종목명</th><th>수치</th><th>거래</th></tr></thead><tbody>
        ${indicators
          .slice(0, 4)
          .map(([name, value]) => `<tr><td>${name}</td><td>${value.toFixed(3)}</td><td class="${signalClass(indicatorSignal(name, value))}">${indicatorSignal(name, value)}</td></tr>`)
          .join("")}
      </tbody></table>
    </div>
    <div class="indicator-mini">
      <table><thead><tr><th>종목명</th><th>수치</th><th>거래</th></tr></thead><tbody>
        ${indicators
          .slice(4)
          .map(([name, value]) => `<tr><td>${name}</td><td>${value.toFixed(3)}</td><td class="${signalClass(indicatorSignal(name, value))}">${indicatorSignal(name, value)}</td></tr>`)
          .join("")}
      </tbody></table>
    </div>
    <div class="indicator-summary">매수:${buyCount} &nbsp; 매도:${sellCount} &nbsp; 중립:${indicators.length - buyCount - sellCount} &nbsp; 지표 요약:<span class="${signalClass(summary)}">${summary}</span></div>
  `;

  const candleRows = detectCandles(snapshot.ohlc, state.selectedTicker);
  const company = snapshot.holding?.company || state.selectedTicker;
  candlestickRows.innerHTML = candleRows
    .map(([period, confidence, pattern]) => {
      const tone = /Bullish|Up/.test(pattern) ? "signal-bull" : "signal-bear";
      return `<tr><td><strong>$${state.selectedTicker}</strong> ${company}</td><td>${period}</td><td class="confidence">${confidence}</td><td class="${tone}">${pattern}</td><td>현재</td></tr>`;
    })
    .join("");
  technicalSubtitle.textContent = `$${state.selectedTicker} · ${state.chartRange} · 보조지표/캔들 자동 판독`;
  renderSignalSheet();
}

function renderSignalSheet() {
  const isBuy = state.signalView === "strong-buy";
  const ranked = holdings
    .map((item) => ({ ...item, signal: aggregateTechnicalSignal(item.ticker) }))
    .sort((a, b) => (isBuy ? b.signal.score - a.signal.score : a.signal.score - b.signal.score));
  const exactRows = ranked.filter((item) => item.signal.summary === (isBuy ? "적극 매수" : "적극 매도"));
  const rows = (exactRows.length ? exactRows : ranked).slice(0, 12);

  signalSheetTitle.textContent = isBuy ? "적극 매수 시트" : "적극 매도 시트";
  signalSheetSubtitle.textContent = `${exactRows.length ? rows.length : `후보 ${rows.length}`}개 종목 · 5분/15분/1시간/일간 요약 시그널 기준`;
  signalSheetControls.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.signalView === state.signalView);
  });

  signalSheetGrid.innerHTML = rows.length
    ? rows
        .map(
          (item) => `
            <article class="signal-card ${isBuy ? "buy" : "sell"}" data-signal-ticker="${item.ticker}">
              <h3>$${item.ticker}</h3>
              <p>${item.company} · ${item.category}${exactRows.length ? "" : " · 후보"}</p>
              <div class="signal-card-meta">
                <span>점수 ${item.signal.score}</span>
                <span>${item.signal.summary}</span>
                <span>${riskLabels[item.risk]}</span>
              </div>
            </article>
          `,
        )
        .join("")
    : `<article class="signal-card"><h3>조건 없음</h3><p>현재 설정에서 ${isBuy ? "적극 매수" : "적극 매도"} 종목이 없습니다.</p></article>`;
}

function renderKospiQuant() {
  const fallback = [
    { rank: 1, ticker: "005930.KS", code: "005930", name: "삼성전자", price: "로드 중", change: "-", changeRate: "-", volume: "-", tradingValue: "-", marketCap: "-", per: "-", roe: "-" },
    { rank: 2, ticker: "000660.KS", code: "000660", name: "SK하이닉스", price: "로드 중", change: "-", changeRate: "-", volume: "-", tradingValue: "-", marketCap: "-", per: "-", roe: "-" },
  ];
  const rows = state.kospiQuant?.items?.length ? state.kospiQuant.items : fallback;
  kospiSubtitle.textContent = state.kospiQuant
    ? `${state.kospiQuant.source} · ${rows.length}개 · ${new Date(state.kospiQuant.fetchedAt).toLocaleTimeString("ko-KR")}`
    : "네이버 금융 거래상위 기준 · 로딩/폴백";
  kospiRows.innerHTML = rows
    .map((item) => {
      const isUp = String(item.changeRate).includes("+") || !String(item.changeRate).includes("-");
      const tone = String(item.changeRate) === "-" ? "" : isUp ? "kospi-up" : "kospi-down";
      return `
        <tr data-kospi-ticker="${item.ticker}" data-kospi-name="${item.name}">
          <td>${item.rank || ""}</td>
          <td class="kospi-name"><strong>${item.name}</strong><span>${item.ticker}</span></td>
          <td>${item.price}</td>
          <td class="${tone}">${item.change}</td>
          <td class="${tone}">${item.changeRate}</td>
          <td>${item.volume}</td>
          <td>${item.tradingValue}</td>
          <td>${item.marketCap}</td>
          <td>${item.per}</td>
          <td>${item.roe}</td>
        </tr>
      `;
    })
    .join("");
}

function renderFundFlow() {
  const isBuy = state.fundFlowType === "fundBuy";
  const fallback = [
    { rank: 1, ticker: "005380.KS", code: "005380", name: "현대차", amount: "로드 중", price: "-", changeRate: "-", threeDay: "-", expectedReturn: "-", pbr: "-", per: "-", marketCap: "-", themes: ["자동차", "전기차"] },
    { rank: 2, ticker: "000660.KS", code: "000660", name: "SK하이닉스", amount: "로드 중", price: "-", changeRate: "-", threeDay: "-", expectedReturn: "-", pbr: "-", per: "-", marketCap: "-", themes: ["반도체", "HBM"] },
  ];
  const rows = state.fundFlow?.items?.length ? state.fundFlow.items : fallback;
  fundFlowTitle.textContent = isBuy ? "국민연금/연기금 비중확대 종목" : "국민연금/연기금 비중축소 종목";
  fundFlowSubtitle.textContent = state.fundFlow
    ? `${state.fundFlow.source} · ${rows.length}개 · ${new Date(state.fundFlow.fetchedAt).toLocaleTimeString("ko-KR")}`
    : "주달 연기금 순매수/순매도 참고 · 로딩/폴백";
  fundFlowControls.querySelectorAll("button[data-fund-flow]").forEach((button) => {
    button.classList.toggle("active", button.dataset.fundFlow === state.fundFlowType);
  });
  fundFlowRows.innerHTML = rows
    .map((item) => {
      const tone = String(item.changeRate).includes("-") ? "kospi-down" : String(item.changeRate) === "-" ? "" : "kospi-up";
      return `
        <tr data-fund-ticker="${item.ticker}" data-fund-name="${item.name}">
          <td>${item.rank || ""}</td>
          <td class="fund-name"><strong>${item.name}</strong><span>${item.market || "KRX"} ${item.code}</span></td>
          <td><strong>${item.amount}</strong></td>
          <td>${item.price}</td>
          <td class="${tone}">${item.changeRate}</td>
          <td class="${tone}">${item.threeDay}</td>
          <td>${item.expectedReturn}</td>
          <td>${item.pbr}</td>
          <td>${item.per}</td>
          <td>${item.marketCap}</td>
          <td>${(item.themes || []).slice(0, 6).map((theme) => `<span class="theme-chip">${theme}</span>`).join("")}</td>
        </tr>
      `;
    })
    .join("");
}

function renderLargeChart() {
  const snapshot = getChartSnapshot();
  modalChartTitle.textContent = `$${state.selectedTicker} 큰 차트`;
  modalChartSubtitle.textContent = `${snapshot.holding?.company || "선택 종목"} · ${state.chartRange} · ${snapshot.hasMatchingLiveChart ? "Yahoo Finance 실시간" : "샘플 가격 흐름"}`;
  modalChartMetrics.innerHTML = metricsMarkup(snapshot);
  drawPriceChart(largeChartCanvas, snapshot, { large: true });
}

function renderNews() {
  if (state.liveNews?.items?.length) {
    newsRows.innerHTML = state.liveNews.items
      .map((item) => {
        const headline = item.title.replace(/\s+-\s+[^-]+$/, "");
        return `
          <tr class="${state.liveNews.ticker === state.selectedTicker ? "active" : ""}" data-news-ticker="${state.liveNews.ticker}" data-news-link="${item.link}">
            <td>${formatClock(item.pubDate)}</td>
            <td class="news-ticker">$${state.liveNews.ticker}</td>
            <td>${item.source || "뉴스"}</td>
            <td class="news-headline">${headline}</td>
            <td><span class="impact flat">${state.newsSource === "naver" ? (state.liveNews.fallback ? "한글대체" : "한글") : "실시간"}</span></td>
          </tr>
        `;
      })
      .join("");
    return;
  }

  const rows = newsItems.filter((item) => state.newsTicker === "all" || item.ticker === state.newsTicker);
  newsRows.innerHTML = rows
    .map(
      (item) => `
        <tr class="${item.ticker === state.selectedTicker ? "active" : ""}" data-news-ticker="${item.ticker}">
          <td>${item.time}</td>
          <td class="news-ticker">$${item.ticker}</td>
          <td>${item.type}</td>
          <td class="news-headline">${item.headline}</td>
          <td><span class="impact ${item.impact}">${item.impact === "up" ? "호재" : item.impact === "down" ? "주의" : "중립"}</span></td>
        </tr>
      `,
    )
    .join("");
}

function renderProfile() {
  const payload = state.liveProfile;
  const profile = payload?.profile || {
    sector: "커버리지 준비",
    industry: "공급자 연결 필요",
    marketCapBand: "확인 필요",
    marketCap: "공급자 연결 필요",
    marketCapRank: "확인 필요",
    style: "관찰형",
    stance: "데이터 확인 후 판단",
    analystOpinion: "공급자 연결 필요",
    targetPrice: "공급자 연결 필요",
    scores: { total: 60, momentum: 60, quality: 60, value: 50, risk: 50 },
    valuation: { per: "확인 필요", pbr: "확인 필요", fcfYield: "확인 필요" },
    quality: { roe: "확인 필요", debt: "확인 필요", volatility: "확인 필요" },
    memo: "공개 데이터 공급자 연결 전 기본 스냅샷입니다.",
    logic: ["가격 추세 확인", "실적 발표 확인"],
    warnings: ["데이터 공백"],
    checklist: ["최근 실적 확인"],
    peers: [],
  };
  const company = state.companyInfo;
  if (company) {
    profile.sector = profile.sector === "커버리지 준비" ? "네이버 기업정보" : profile.sector;
    profile.industry = profile.industry === "공급자 연결 필요" ? "국내 상장사" : profile.industry;
    profile.style = profile.style === "관찰형" ? "데이터 확인형" : profile.style;
    profile.marketCap = company.marketCap || profile.marketCap;
    profile.marketCapRank = company.marketRank || profile.marketCapRank;
    profile.valuation.per = company.per || profile.valuation.per;
    profile.valuation.pbr = company.pbr || profile.valuation.pbr;
    profile.targetPrice = company.consensusPer !== "N/A" ? `추정 PER ${company.consensusPer}배 / EPS ${company.consensusEps}` : profile.targetPrice;
    profile.analystOpinion = company.sectorPer !== "N/A" ? `동일업종 PER ${company.sectorPer}배` : profile.analystOpinion;
    if (company.overview?.length) profile.memo = company.overview.join(" ");
  }
  profileTitle.textContent = `$${state.selectedTicker} ${company?.name ? `${company.name} ` : ""}커버리지와 프로필`;
  profileSubtitle.textContent = `${profile.sector} · ${profile.industry} · ${profile.style}`;
  profileStatus.textContent = `데이터 상태: ${company ? "네이버 기업정보 연결" : payload?.source || "로컬 스냅샷"} · ${profile.stance}`;
  totalScore.textContent = `${profile.scores.total}점`;
  scoreBars.innerHTML = [
    ["모멘텀", profile.scores.momentum],
    ["퀄리티", profile.scores.quality],
    ["가치", profile.scores.value],
    ["리스크", profile.scores.risk],
  ]
    .map(
      ([label, score]) => `
        <div class="score-row">
          <span>${label}</span>
          <div class="score-track"><div class="score-fill" style="width:${Math.max(0, Math.min(100, score))}%"></div></div>
          <strong>${score}</strong>
        </div>
      `,
    )
    .join("");

  const facts = [
    ["섹터", profile.sector],
    ["업종", profile.industry],
    ["시총 구간", profile.marketCapBand],
    ["시가총액", profile.marketCap],
    ["시총순위", profile.marketCapRank],
    ["상장주식수", company?.shares || "확인 필요"],
    ["외국인소진율", company?.foreignLimit || "확인 필요"],
    ["투자의견", profile.analystOpinion],
    ["목표주가", profile.targetPrice],
    ["PER / PBR", `${profile.valuation.per} / ${profile.valuation.pbr}`],
    ["FCF Yield", profile.valuation.fcfYield],
    ["ROE / 부채", `${profile.quality.roe} / ${profile.quality.debt}`],
    ["배당수익률", company?.dividend || "N/A"],
    ["동일업종 등락률", company?.sectorChange || "N/A"],
  ];
  profileFacts.innerHTML = facts.map(([label, value]) => `<div class="fact"><span>${label}</span><strong>${value}</strong></div>`).join("");

  profileNotes.innerHTML = `
    <h3>핵심 투자 논리</h3>
    <p>${profile.memo}</p>
    <div class="profile-chip-list">${profile.logic.map((item) => `<span class="profile-chip">${item}</span>`).join("")}</div>
    <h3 class="profile-warning">경고 신호</h3>
    <p>${profile.warnings.join(" · ")}</p>
    <h3>매수 전 체크리스트</h3>
    <p>${profile.checklist.join(" · ")}</p>
    <div class="profile-chip-list">${profile.peers.map((item) => `<span class="profile-chip">비교 ${item}</span>`).join("")}</div>
  `;
}

function selectTicker(ticker) {
  ensureHolding(ticker);
  state.selectedTicker = ticker;
  chartTickerSelect.value = ticker;
  loadLiveChart();
  loadLiveNews();
  loadProfile();
  statusText.textContent = `$${ticker} 차트 선택 · 뉴스피드 연동`;
}

function openLargeChart() {
  chartModal.classList.add("open");
  chartModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    renderLargeChart();
    closeChartButton.focus();
  });
}

function closeLargeChart() {
  chartModal.classList.remove("open");
  chartModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  expandChartButton.focus();
}

function openAddStockModal() {
  addStockModal.classList.add("open");
  addStockModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => newTickerInput.focus());
}

function closeAddStockModal() {
  addStockModal.classList.remove("open");
  addStockModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  openAddStockButton.focus();
}

function addCustomHolding(formData) {
  const ticker = normalizeTicker(formData.ticker);
  if (!ticker) return;
  const item = {
    ticker,
    company: formData.company.trim() || ticker,
    description: formData.description.trim() || "사용자 추가 종목",
    category: formData.category,
    risk: formData.risk,
    score: 3,
    custom: true,
  };
  state.customHoldings = state.customHoldings.filter((holding) => normalizeTicker(holding.ticker) !== ticker);
  state.customHoldings.push(item);
  safeStore.set("custom-holdings", state.customHoldings);
  state.category = "전체";
  state.risk = "all";
  state.query = ticker;
  searchInput.value = ticker;
  riskSelect.value = "all";
  rebuildHoldings();
  renderSelectors();
  renderBoard();
  renderSignalSheet();
  selectTicker(ticker);
  statusText.textContent = `$${ticker} 종목 추가 완료`;
}

function ensureHolding(ticker, company = "") {
  const normalized = normalizeTicker(ticker);
  if (holdings.some((item) => item.ticker === normalized)) return;
  state.customHoldings.push({
    ticker: normalized,
    company: company || normalized,
    description: "외부 표에서 자동 추가된 종목",
    category: normalized.endsWith(".KS") || normalized.endsWith(".KQ") ? "산업 / 국방 / 인프라" : "AI / 빅테크 / 클라우드",
    risk: "growth",
    score: 3,
    custom: true,
  });
  safeStore.set("custom-holdings", state.customHoldings);
  rebuildHoldings();
  renderSelectors();
}

function renderStats(items) {
  const individualCount = items.filter((item) => item.risk !== "etf").length;
  const etfCount = items.filter((item) => item.risk === "etf").length;
  const volatileCount = items.filter((item) => item.risk === "volatile").length;
  const starredCount = items.filter((item) => state.starred.has(item.ticker)).length;
  const topTheme = categories
    .map((category) => [category, items.filter((item) => item.category === category).length])
    .sort((a, b) => b[1] - a[1])[0];

  statsRow.innerHTML = [
    ["표시 종목", `${items.length}개`],
    ["개별 기업", `${individualCount}개`],
    ["ETF / 방어", `${etfCount}개`],
    ["고변동", `${volatileCount}개`],
    ["관심 표시", `${starredCount}개`],
  ]
    .map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  statusText.textContent = `${topTheme?.[0] || "전체"} · ${items.length}개 표시 · 매수/매도 추천 아님`;
}

function renderTabs() {
  const tabItems = ["전체", ...categories];
  tabs.innerHTML = tabItems
    .map((category) => {
      const active = category === state.category ? "active" : "";
      return `<button class="${active}" type="button" data-category="${category}">${category}</button>`;
    })
    .join("");
}

function renderCard(item) {
  const isStarred = state.starred.has(item.ticker);
  const quote = state.liveQuotes[item.ticker];
  const move = formatQuoteMove(quote, item.ticker);
  return `
    <article class="stock-card" data-risk="${item.risk}">
      <div class="stock-top">
        <div>
          <div class="ticker">$${item.ticker}</div>
          <div class="company">${item.company} · ${formatQuotePrice(quote)} · ${move.label}</div>
        </div>
        <button class="star ${isStarred ? "active" : ""}" type="button" data-star="${item.ticker}" aria-label="${item.ticker} 관심 표시">★</button>
      </div>
      <p class="description">${item.description}</p>
      <div class="tags">
        <span class="tag ${item.risk}">${riskLabels[item.risk]}</span>
        <span class="tag">관심도 ${"■".repeat(item.score)}${"□".repeat(5 - item.score)}</span>
      </div>
    </article>
  `;
}

function renderBoard() {
  const items = getFilteredHoldings();
  renderStats(items);
  renderTabs();
  renderWatchRows(items);

  const visibleCategories =
    state.category === "전체"
      ? categories.filter((category) => !state.query.trim() || items.some((item) => item.category === category))
      : [state.category];
  board.innerHTML = visibleCategories
    .map((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      return `
        <section class="kanban-column">
          <header class="column-header">
            <h2>${category}<span>${categoryItems.length}</span></h2>
          </header>
          <div class="cards">
            ${categoryItems.length ? categoryItems.map(renderCard).join("") : `<article class="stock-card"><p class="description">조건에 맞는 종목이 없습니다.</p></article>`}
          </div>
        </section>
      `;
    })
    .join("");
  renderNews();
}

function renderWatchRows(items) {
  const rows = [...items]
    .sort((a, b) => b.score - a.score || a.ticker.localeCompare(b.ticker))
    .slice(0, 14);
  watchCount.textContent = `${rows.length}개`;
  watchRows.innerHTML = rows
    .map(
      (item) => {
        const quote = state.liveQuotes[item.ticker];
        const move = formatQuoteMove(quote, item.ticker);
        return `
        <div class="watch-row" data-watch-ticker="${item.ticker}">
          <strong>$${item.ticker}</strong>
          <span>${item.company} · ${formatQuotePrice(quote)} · ${move.label}</span>
          <i class="mini-risk ${item.risk}" aria-hidden="true"></i>
        </div>
      `;
      },
    )
    .join("");
}

function renderChat() {
  const seedNotes = [
    "AI 컴퓨팅은 NVDA, MSFT, AVGO가 중심.",
    "NOW는 로봇/워크플로우 자동화 테마로 따로 추적.",
    "MSTR, COIN, MARA는 움직임 클 수 있음.",
  ];
  const notes = [...seedNotes, ...state.notes].slice(-8);
  chatBody.innerHTML = notes.map((note) => `<div class="chat-message">${note}</div>`).join("");
  chatBody.scrollTop = chatBody.scrollHeight;
}

function applyPreset(preset) {
  const presets = {
    all: { category: "전체", risk: "all", query: "" },
    now: { category: "전체", risk: "all", query: "NOW" },
    ai: { category: "AI / 빅테크 / 클라우드", risk: "all", query: "" },
    semis: { category: "반도체 / AI 인프라", risk: "all", query: "" },
    etf: { category: "ETF / 자산배분", risk: "all", query: "" },
    volatile: { category: "전체", risk: "volatile", query: "" },
    crypto: { category: "금융 / 크립토 / 데이터", risk: "volatile", query: "" },
    strongBuy: { category: "전체", risk: "all", query: "" },
    strongSell: { category: "전체", risk: "all", query: "" },
    kospi: { category: "전체", risk: "all", query: "" },
    fund: { category: "전체", risk: "all", query: "" },
  };
  const next = presets[preset] || presets.all;
  state.category = next.category;
  state.risk = next.risk;
  state.query = next.query;
  searchInput.value = state.query;
  riskSelect.value = state.risk;
  renderBoard();
  loadLiveNews();
  if (preset === "strongBuy" || preset === "strongSell") {
    state.signalView = preset === "strongBuy" ? "strong-buy" : "strong-sell";
    renderSignalSheet();
    signalSheetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (preset === "kospi") {
    loadKospiQuant();
    kospiPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (preset === "fund") {
    loadFundFlow();
    fundFlowPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setActiveButton(container, button) {
  container.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderBoard();
});

board.addEventListener("click", (event) => {
  const card = event.target.closest(".stock-card");
  if (card && !event.target.closest("button")) {
    const ticker = card.querySelector(".ticker")?.textContent.replace("$", "");
    if (ticker) selectTicker(ticker);
  }
  const button = event.target.closest("button[data-star]");
  if (!button) return;
  const ticker = button.dataset.star;
  if (state.starred.has(ticker)) {
    state.starred.delete(ticker);
  } else {
    state.starred.add(ticker);
  }
  safeStore.set("portfolio-stars", [...state.starred]);
  renderBoard();
});

watchRows.addEventListener("click", (event) => {
  const row = event.target.closest("[data-watch-ticker]");
  if (!row) return;
  selectTicker(row.dataset.watchTicker);
});

newsRows.addEventListener("click", (event) => {
  const row = event.target.closest("[data-news-ticker]");
  if (!row) return;
  selectTicker(row.dataset.newsTicker);
});

chartTickerSelect.addEventListener("change", (event) => {
  selectTicker(event.target.value);
});

expandChartButton.addEventListener("click", () => {
  openLargeChart();
});

closeChartButton.addEventListener("click", () => {
  closeLargeChart();
});

chartModal.addEventListener("click", (event) => {
  if (event.target === chartModal) closeLargeChart();
});

openAddStockButton.addEventListener("click", () => {
  openAddStockModal();
});

closeAddStockButton.addEventListener("click", () => {
  closeAddStockModal();
});

addStockModal.addEventListener("click", (event) => {
  if (event.target === addStockModal) closeAddStockModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chartModal.classList.contains("open")) {
    closeLargeChart();
  }
  if (event.key === "Escape" && addStockModal.classList.contains("open")) {
    closeAddStockModal();
  }
});

addStockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCustomHolding({
    ticker: newTickerInput.value,
    company: newCompanyInput.value,
    category: newCategoryInput.value,
    risk: newRiskInput.value,
    description: newDescriptionInput.value,
  });
  addStockForm.reset();
  closeAddStockModal();
});

clearCustomStocksButton.addEventListener("click", () => {
  state.customHoldings = [];
  safeStore.set("custom-holdings", state.customHoldings);
  rebuildHoldings();
  renderSelectors();
  renderBoard();
  renderSignalSheet();
  statusText.textContent = "사용자 추가 종목 초기화 완료";
});

chartRangeSelect.addEventListener("change", (event) => {
  state.chartRange = event.target.value;
  loadLiveChart();
});

newsTickerSelect.addEventListener("change", (event) => {
  state.newsTicker = event.target.value;
  loadLiveNews();
});

newsSourceSelect.addEventListener("change", (event) => {
  state.newsSource = event.target.value;
  loadLiveNews();
});

timeframeChecks.forEach((input) => {
  input.addEventListener("change", () => {
    renderTechnical();
  });
});

window.addEventListener("resize", () => {
  renderChart();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderBoard();
});

riskSelect.addEventListener("change", (event) => {
  state.risk = event.target.value;
  renderBoard();
});

document.querySelector("#clearButton").addEventListener("click", () => {
  state.category = "전체";
  state.risk = "all";
  state.query = "";
  searchInput.value = "";
  riskSelect.value = "all";
  renderBoard();
});

document.querySelector("#refreshButton").addEventListener("click", () => {
  loadLiveQuotes();
  loadLiveChart();
  loadLiveNews();
  statusText.textContent = state.liveMode ? "실시간 데이터 새로 고침 중..." : "파일 모드 · 샘플 데이터 새로 고침";
});

document.querySelector(".sheet-sidebar").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  setActiveButton(event.currentTarget, button);
  const label = button.textContent.trim();
  if (label.includes("젠슨황")) applyPreset("now");
  else if (label.includes("AI 컴퓨팅")) applyPreset("ai");
  else if (label.includes("반도체")) applyPreset("semis");
  else if (label.includes("ETF")) applyPreset("etf");
  else if (label.includes("고변동")) applyPreset("volatile");
  else if (label.includes("코스피 상위")) applyPreset("kospi");
  else if (label.includes("연기금")) applyPreset("fund");
  else if (label.includes("적극 매수")) applyPreset("strongBuy");
  else if (label.includes("적극 매도")) applyPreset("strongSell");
  else applyPreset("all");
});

document.querySelector(".sheet-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  setActiveButton(event.currentTarget, button);
  const label = button.textContent.trim();
  if (label === "코인") applyPreset("crypto");
  else if (label === "ETF") applyPreset("etf");
  else if (label === "코스피상위") applyPreset("kospi");
  else if (label === "연기금") applyPreset("fund");
  else if (label === "적극매수") applyPreset("strongBuy");
  else if (label === "적극매도") applyPreset("strongSell");
  else if (label === "미장") applyPreset("all");
  else statusText.textContent = `${label} 시트 선택 · 현재 데이터는 참고용 샘플`;
});

signalSheetControls.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-signal-view]");
  if (!button) return;
  state.signalView = button.dataset.signalView;
  renderSignalSheet();
});

signalSheetGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-signal-ticker]");
  if (!card) return;
  selectTicker(card.dataset.signalTicker);
});

refreshKospiButton.addEventListener("click", () => {
  loadKospiQuant();
});

kospiRows.addEventListener("click", (event) => {
  const row = event.target.closest("[data-kospi-ticker]");
  if (!row) return;
  ensureHolding(row.dataset.kospiTicker, row.dataset.kospiName);
  selectTicker(row.dataset.kospiTicker);
});

fundFlowControls.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-fund-flow]");
  if (!button) return;
  state.fundFlowType = button.dataset.fundFlow;
  loadFundFlow();
});

refreshFundFlowButton.addEventListener("click", () => {
  loadFundFlow();
});

fundFlowRows.addEventListener("click", (event) => {
  const row = event.target.closest("[data-fund-ticker]");
  if (!row) return;
  ensureHolding(row.dataset.fundTicker, row.dataset.fundName);
  selectTicker(row.dataset.fundTicker);
});

document.querySelector(".tabs").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  setActiveButton(event.currentTarget, button);
  statusText.textContent = `${button.textContent.trim()} 메뉴 선택됨`;
});

document.querySelector(".mail-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  setActiveButton(event.currentTarget, button);
  statusText.textContent = `Outlook ${button.textContent.trim()} 탭 선택됨`;
});

document.querySelectorAll(".tool-stack button, .tool.big").forEach((button) => {
  button.addEventListener("click", () => {
    statusText.textContent = `${button.textContent.trim()} 실행 · 샘플 워크북`;
  });
});

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = noteInput.value.trim();
  if (!note) return;
  state.notes.push(note);
  safeStore.set("portfolio-notes", state.notes);
  noteInput.value = "";
  renderChat();
});

rebuildHoldings();
populateAddStockCategories();
renderRows();
renderSelectors();
renderTickerTape();
renderChat();
renderBoard();
loadLiveQuotes();
loadLiveChart();
loadLiveNews();
loadProfile();
loadKospiQuant();
loadFundFlow();
setInterval(() => {
  loadLiveQuotes();
  loadLiveChart();
  loadLiveNews();
}, 60000);
setInterval(() => {
  loadProfile();
  loadKospiQuant();
  loadFundFlow();
}, 300000);
