const rangeMap = {
  "1D": { range: "1d", interval: "5m" },
  "5D": { range: "5d", interval: "15m" },
  "1M": { range: "1mo", interval: "1d" },
  "6M": { range: "6mo", interval: "1d" },
  "1Y": { range: "1y", interval: "1d" },
};

const memoryCache = new Map();

function getCached(key) {
  const entry = memoryCache.get(key);
  if (!entry || entry.expiresAt < Date.now()) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value;
}

function setCached(key, value, ttlMs) {
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

const tickerMetadata = {
  NVDA: ["반도체", "AI 가속기 / GPU", "공격형 성장", ["AVGO", "AMD", "TSM"]],
  MSFT: ["AI / 빅테크 / 클라우드", "클라우드 인프라 / AI 소프트웨어", "퀄리티 성장", ["GOOGL", "AMZN", "ORCL"]],
  AAPL: ["AI / 빅테크 / 클라우드", "모바일 하드웨어 / 서비스", "대형 퀄리티", ["MSFT", "GOOGL", "AMZN"]],
  AMZN: ["AI / 빅테크 / 클라우드", "이커머스 / AWS 클라우드", "성장형 경기민감", ["MSFT", "GOOGL", "ORCL"]],
  GOOGL: ["AI / 빅테크 / 클라우드", "검색 / 광고 / 클라우드", "퀄리티 성장", ["MSFT", "META", "AMZN"]],
  AVGO: ["반도체", "통신 네트워크 / 맞춤형 반도체", "AI 인프라 성장", ["NVDA", "TXN", "QCOM"]],
  TXN: ["반도체", "아날로그 / 임베디드 반도체", "방어형 반도체", ["ADI", "AVGO", "NXPI"]],
  SNPS: ["반도체", "EDA 소프트웨어", "성장형 퀄리티", ["CDNS", "ANSS", "KLAC"]],
  CDNS: ["반도체", "EDA 설계 / 검증", "성장형 퀄리티", ["SNPS", "ANSS", "KLAC"]],
  KLAC: ["반도체", "공정 검사 / 계측 장비", "반도체 사이클", ["ASML", "AMAT", "LRCX"]],
  DELL: ["반도체 / AI 인프라", "서버 / IT 인프라", "AI 인프라 경기민감", ["HPQ", "HPE", "SMCI"]],
  JBL: ["반도체 / AI 인프라", "전자제품 제조 / 공급망", "제조 경기민감", ["FLEX", "SANM", "DELL"]],
  ORCL: ["기업 SW / SaaS / 보안", "DB / 클라우드 인프라", "퀄리티 성장", ["MSFT", "CRM", "NOW"]],
  CRM: ["기업 SW / SaaS / 보안", "CRM / 데이터 플랫폼", "성장형 SaaS", ["NOW", "WDAY", "ORCL"]],
  ADBE: ["기업 SW / SaaS / 보안", "창작 SW / 디지털 마케팅", "성장형 SaaS", ["CRM", "NOW", "INTU"]],
  NOW: ["기업 SW / SaaS / 보안", "워크플로우 자동화", "성장형 퀄리티", ["CRM", "WDAY", "ADBE"]],
  WDAY: ["기업 SW / SaaS / 보안", "인사 / 재무 클라우드", "성장형 SaaS", ["NOW", "CRM", "ADP"]],
  FFIV: ["기업 SW / SaaS / 보안", "애플리케이션 보안 / 전송", "인프라 SW", ["PANW", "CRWD", "NET"]],
  ETN: ["산업 / 국방 / 인프라", "전력 관리 / 에너지 인프라", "인프라 성장", ["TT", "EMR", "PH"]],
  MSI: ["산업 / 국방 / 인프라", "공공 안전 통신", "방어형 인프라", ["AXON", "LHX", "NOC"]],
  WM: ["산업 / 국방 / 인프라", "폐기물 처리 / 재활용", "방어형 인프라", ["RSG", "WCN", "AWK"]],
  TDG: ["산업 / 국방 / 인프라", "항공우주 / 방산 부품", "방산 성장", ["BA", "RTX", "HEI"]],
  BA: ["산업 / 국방 / 인프라", "항공기 / 방산", "턴어라운드 경기민감", ["AIR", "RTX", "LMT"]],
  AXON: ["산업 / 국방 / 인프라", "공공 안전 장비 / 클라우드", "고성장 방산", ["MSI", "LHX", "PLTR"]],
  IEX: ["산업 / 국방 / 인프라", "특수 펌프 / 정밀 기기", "산업 퀄리티", ["DOV", "PH", "ITW"]],
  COST: ["소비 / 플랫폼", "회원제 할인 매장", "방어형 소비", ["WMT", "TGT", "KR"]],
  HD: ["소비 / 플랫폼", "주택 개량 소매", "경기민감 소비", ["LOW", "WMT", "COST"]],
  NFLX: ["소비 / 플랫폼", "스트리밍 플랫폼", "성장형 플랫폼", ["DIS", "CMCSA", "GOOGL"]],
  UBER: ["소비 / 플랫폼", "모빌리티 / 배달 플랫폼", "성장형 플랫폼", ["DASH", "LYFT", "BKNG"]],
  CVNA: ["소비 / 플랫폼", "온라인 중고차", "고변동 성장", ["KMX", "AN", "LAD"]],
  NWSA: ["소비 / 플랫폼", "뉴스 미디어 / 정보 서비스", "방어형 미디어", ["NYT", "FOX", "PARA"]],
  ICE: ["금융 / 크립토 / 데이터", "거래소 / 금융 데이터", "금융 인프라", ["CME", "NDAQ", "SPGI"]],
  MSTR: ["금융 / 크립토 / 데이터", "비트코인 연동 기업", "고변동 크립토", ["COIN", "MARA", "BTC-USD"]],
  COIN: ["금융 / 크립토 / 데이터", "암호화폐 거래소", "고변동 크립토", ["MSTR", "MARA", "HOOD"]],
  MARA: ["금융 / 크립토 / 데이터", "비트코인 채굴", "초고변동 크립토", ["RIOT", "COIN", "MSTR"]],
  DVA: ["헬스케어 / 유틸리티", "신장 투석 / 만성질환", "방어형 헬스케어", ["FMS", "UNH", "HUM"]],
  WST: ["헬스케어 / 유틸리티", "의약품 포장 / 전달", "헬스케어 퀄리티", ["BDX", "STE", "TMO"]],
  XEL: ["헬스케어 / 유틸리티", "전기 / 가스 유틸리티", "방어형 유틸리티", ["NEE", "DUK", "SO"]],
  VTI: ["ETF / 자산배분", "미국 전체 주식 ETF", "장기 분산", ["VOO", "IWB", "RSP"]],
  VOO: ["ETF / 자산배분", "S&P 500 ETF", "장기 코어", ["VTI", "SPY", "IVV"]],
  IEMG: ["ETF / 자산배분", "신흥국 ETF", "글로벌 분산", ["EEM", "EFA", "VWO"]],
  XLK: ["ETF / 자산배분", "미국 기술섹터 ETF", "성장 섹터", ["QQQ", "VOO", "VGT"]],
  EFA: ["ETF / 자산배분", "선진국 ex-US ETF", "글로벌 분산", ["IEFA", "IEMG", "VEA"]],
  IWB: ["ETF / 자산배분", "Russell 1000 ETF", "대형주 분산", ["VTI", "VOO", "RSP"]],
  RSP: ["ETF / 자산배분", "S&P 500 균등가중 ETF", "분산 리밸런싱", ["VOO", "IWB", "XLI"]],
  XLI: ["ETF / 자산배분", "산업재 ETF", "산업 경기민감", ["VIS", "IYJ", "VOO"]],
  GOVT: ["ETF / 자산배분", "미국 국채 ETF", "방어형 채권", ["IEF", "TLT", "SHY"]],
  COMT: ["ETF / 자산배분", "원자재 ETF", "인플레이션 헤지", ["DBC", "PDBC", "GLD"]],
  "000660.KS": ["반도체", "메모리 반도체", "공격형 경기민감", ["005930.KS", "MU", "WDC"]],
};

const profileSnapshots = {
  NVDA: {
    sector: "반도체",
    industry: "AI 가속기 / GPU",
    marketCapBand: "초대형주",
    marketCap: "약 $4.5T",
    marketCapRank: "미국 상장 시총 최상위권",
    style: "공격형 성장",
    stance: "관찰 후 조건부 매수",
    analystOpinion: "대체로 긍정",
    targetPrice: "공급자 연결 필요",
    scores: { total: 82, momentum: 94, quality: 91, value: 42, risk: 38 },
    valuation: { per: "높은 성장 프리미엄", pbr: "높음", fcfYield: "중간" },
    quality: { roe: "매우 높음", debt: "관리 가능", volatility: "높음" },
    memo: "AI 데이터센터 CAPEX가 이어질 때 가장 직접적인 수혜를 받지만, 기대치가 높아 실적 가이던스 둔화에는 민감합니다.",
    logic: ["AI 가속기 수요", "CUDA 생태계", "데이터센터 투자 사이클"],
    warnings: ["밸류에이션 부담", "대형 고객 CAPEX 둔화", "경쟁 칩 확대"],
    checklist: ["실적 가이던스 확인", "데이터센터 매출 성장률 확인", "총 자산 대비 비중 상한 설정"],
    peers: ["AVGO", "AMD", "TSM"],
  },
  NOW: {
    sector: "기업 소프트웨어",
    industry: "워크플로우 자동화",
    marketCapBand: "대형주",
    marketCap: "약 $200B+",
    marketCapRank: "SaaS 최상위권",
    style: "성장형 퀄리티",
    stance: "관찰 후 분할 접근",
    analystOpinion: "긍정 우위",
    targetPrice: "공급자 연결 필요",
    scores: { total: 78, momentum: 85, quality: 88, value: 46, risk: 44 },
    valuation: { per: "프리미엄", pbr: "높음", fcfYield: "양호" },
    quality: { roe: "양호", debt: "낮음", volatility: "중간 이상" },
    memo: "AI 에이전트와 로봇/업무 자동화 테마가 붙을 수 있으나, 높은 멀티플은 성장률 유지가 전제입니다.",
    logic: ["ITSM/워크플로우 표준화", "AI 에이전트", "엔터프라이즈 자동화"],
    warnings: ["SaaS 멀티플 압축", "성장률 둔화", "대형 고객 지출 통제"],
    checklist: ["RPO 성장률 확인", "영업마진 추이 확인", "AI 제품 매출 기여도 확인"],
    peers: ["CRM", "WDAY", "ADBE"],
  },
  "000660.KS": {
    sector: "반도체",
    industry: "메모리 반도체",
    marketCapBand: "대형주",
    marketCap: "공급자 연결 필요",
    marketCapRank: "국내 시총 최상위권",
    style: "공격형 경기민감",
    stance: "관찰 후 조건부 매수",
    analystOpinion: "업황 민감 / 긍정 우위",
    targetPrice: "증권사 컨센서스 연결 필요",
    scores: { total: 74, momentum: 100, quality: 93, value: 58, risk: 35 },
    valuation: { per: "17.6배", pbr: "5.6배", fcfYield: "3.8%" },
    quality: { roe: "31.5%", debt: "32%", volatility: "44%" },
    memo: "메모리 업황 회복 구간에서 실적 탄성이 매우 큰 종목입니다. 업황이 맞으면 이익이 빠르게 튀지만, 가격 사이클이 꺾이면 변동성도 크게 받습니다.",
    logic: ["HBM 공급 확대와 AI 메모리 점유율", "메모리 현물가/고정가 동반 상승", "CAPEX 절제와 재고 정상화"],
    warnings: ["높은 변동성", "최근 12개월 수익률 급등 후 추격 매수 위험"],
    checklist: ["최신 실적과 가이던스 확인", "허용 손실폭과 비중 상한 설정", "KRX 공시와 국내 업황 뉴스 확인", "눌림/실적 확인 조건부 진입"],
    peers: ["005930.KS", "MU", "WDC"],
  },
};

function safeTicker(value) {
  return String(value || "NVDA").replace(/[^A-Z0-9.^=-]/gi, "").toUpperCase().slice(0, 18) || "NVDA";
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : 0));
}

function pctChange(now, before) {
  return Number.isFinite(now) && Number.isFinite(before) && before !== 0 ? ((now - before) / before) * 100 : 0;
}

function formatCurrencyValue(value, currency = "USD") {
  if (!Number.isFinite(value)) return "확인 필요";
  const symbol = currency === "KRW" ? "₩" : "$";
  return `${symbol}${value.toLocaleString(undefined, { maximumFractionDigits: currency === "KRW" ? 0 : 2 })}`;
}

function translateRecommendation(key) {
  const map = {
    strong_buy: "적극 매수",
    buy: "매수",
    hold: "중립",
    underperform: "매도",
    sell: "적극 매도",
  };
  return map[String(key || "").toLowerCase()] || "";
}

function decodeXml(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchChartPayload(tickerValue, requestedRange) {
  const ticker = safeTicker(tickerValue);
  const config = rangeMap[requestedRange] || rangeMap["1D"];
  const cacheKey = `chart:${ticker}:${requestedRange}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=${config.range}&interval=${config.interval}`;
  const upstream = await fetch(yahooUrl, {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Yahoo responded ${upstream.status}`);
  const data = await upstream.json();
  const result = data?.chart?.result?.[0];
  const quote = result?.indicators?.quote?.[0] || {};
  const timestamps = result?.timestamp || [];
  const opens = quote.open || [];
  const highs = quote.high || [];
  const lows = quote.low || [];
  const closes = quote.close || [];
  const volumes = quote.volume || [];
  const points = timestamps
    .map((time, index) => ({
      time,
      open: opens[index],
      high: highs[index],
      low: lows[index],
      close: closes[index],
      volume: volumes[index] || 0,
    }))
    .filter((point) => Number.isFinite(point.close));
  if (!points.length) throw new Error("No price points");
  return setCached(cacheKey, {
    source: "Yahoo Finance",
    ticker,
    range: requestedRange,
    currency: result?.meta?.currency || "USD",
    regularMarketPrice: result?.meta?.regularMarketPrice || points.at(-1).close,
    previousClose: result?.meta?.chartPreviousClose || points[0].close,
    meta: result?.meta || {},
    points,
    fetchedAt: new Date().toISOString(),
  }, requestedRange === "1D" ? 25_000 : 5 * 60_000);
}

async function fetchQuotesPayload(tickerValues = []) {
  const tickers = [...new Set(
    (Array.isArray(tickerValues) ? tickerValues : String(tickerValues || "").split(","))
      .map(safeTicker)
      .filter(Boolean),
  )].slice(0, 60);
  const results = [];
  const concurrency = 8;
  let cursor = 0;
  async function worker() {
    while (cursor < tickers.length) {
      const index = cursor;
      cursor += 1;
      const ticker = tickers[index];
      try {
      const chart = await fetchChartPayload(ticker, "1D");
      const price = chart.regularMarketPrice;
      const previousClose = chart.previousClose;
      const change = Number.isFinite(price) && Number.isFinite(previousClose) ? price - previousClose : 0;
      const changeRate = previousClose ? (change / previousClose) * 100 : 0;
        results[index] = {
          status: "fulfilled",
          value: {
        ticker,
        source: chart.source,
        currency: chart.currency,
        price,
        previousClose,
        change,
        changeRate,
        points: chart.points.length,
        fetchedAt: chart.fetchedAt,
          },
        };
      } catch (error) {
        results[index] = { status: "rejected", reason: error };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, tickers.length) }, worker));
  const quotes = {};
  const errors = {};
  results.forEach((result, index) => {
    const ticker = tickers[index];
    if (result.status === "fulfilled") quotes[ticker] = result.value;
    else errors[ticker] = result.reason?.message || "quote fetch failed";
  });
  return {
    source: "Yahoo Finance chart quote",
    quotes,
    errors,
    requested: tickers.length,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchGoogleNewsPayload(tickerValue) {
  const ticker = safeTicker(tickerValue || "AI STOCKS");
  const query = ticker === "AI STOCKS" ? "AI stocks" : `${ticker} stock`;
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const upstream = await fetch(rssUrl, {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Google News responded ${upstream.status}`);
  const xml = await upstream.text();
  const items = parseRssItems(xml, ticker);
  return { source: "Google News RSS", ticker, items, fetchedAt: new Date().toISOString() };
}

async function fetchNaverNewsPayload(tickerValue) {
  const ticker = safeTicker(tickerValue || "NVDA");
  const query = `${ticker} 주식`;
  const rssUrl = `https://newssearch.naver.com/search.naver?where=rss&query=${encodeURIComponent(query)}`;
  const upstream = await fetch(rssUrl, {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Naver News responded ${upstream.status}`);
  const xml = await upstream.text();
  const items = parseRssItems(xml, ticker);
  return { source: "Naver News RSS", ticker, items, fetchedAt: new Date().toISOString() };
}

function parseRssItems(xml, ticker) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 18).map((match) => {
    const block = match[1];
    return {
      ticker,
      title: decodeXml(block.match(/<title>([\s\S]*?)<\/title>/)?.[1]),
      link: decodeXml(block.match(/<link>([\s\S]*?)<\/link>/)?.[1]),
      pubDate: decodeXml(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]),
      source: decodeXml(block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] || block.match(/<author>([\s\S]*?)<\/author>/)?.[1] || "News"),
    };
  });
}

function getDefaultProfile(ticker) {
  const [sector = "커버리지 준비", industry = "공급자 연결 필요", style = "관찰형", peers = []] = tickerMetadata[ticker] || [];
  const isEtf = sector === "ETF / 자산배분";
  return {
    sector,
    industry,
    marketCapBand: isEtf ? "ETF" : "확인 필요",
    marketCap: isEtf ? "ETF 순자산 확인 필요" : "공급자 연결 필요",
    marketCapRank: isEtf ? "ETF" : "확인 필요",
    style,
    stance: "데이터 확인 후 판단",
    analystOpinion: "모델 판독 준비",
    targetPrice: "모델 범위 산출 준비",
    scores: { total: 60, momentum: 60, quality: 60, value: 50, risk: 50 },
    valuation: { per: "확인 필요", pbr: "확인 필요", fcfYield: "확인 필요" },
    quality: { roe: "확인 필요", debt: "확인 필요", volatility: "확인 필요" },
    memo: "가격/차트 기반 자동 프로필을 불러오는 중입니다.",
    logic: ["가격 추세 확인", "실적 발표 확인", "동종업계 비교"],
    warnings: ["데이터 공백", "공시/뉴스 확인 필요"],
    checklist: ["최근 실적 확인", "뉴스 이벤트 확인", "비중 상한 설정"],
    peers,
  };
}

function getProfilePayload(tickerValue) {
  const ticker = safeTicker(tickerValue);
  const profile = profileSnapshots[ticker] || getDefaultProfile(ticker);
  return { ticker, profile, source: "Local coverage snapshot", fetchedAt: new Date().toISOString() };
}

async function fetchYahooQuoteFacts(ticker) {
  const cacheKey = `yahoo-facts:${ticker}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  const upstream = await fetch(`https://finance.yahoo.com/quote/${encodeURIComponent(ticker)}`, {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Yahoo quote page responded ${upstream.status}`);
  const html = await upstream.text();
  const field = (name) => {
    const pattern = new RegExp(`data-field="${name}"[^>]*>([\\s\\S]*?)<\\/fin-streamer>`);
    return stripHtml(html.match(pattern)?.[1] || "");
  };
  const escapedObject = (name, property = "fmt") => {
    const index = html.indexOf(`${name}\\":`);
    if (index < 0) return "";
    const slice = html.slice(index, index + 260);
    const pattern = property === "raw" ? /raw\\":([^,}\\"]+)/ : /fmt\\":\\"([^"\\]+)/;
    return stripHtml(slice.match(pattern)?.[1] || "");
  };
  const escapedString = (name) => {
    const pattern = new RegExp(`${name}\\\\":\\\\"([^"\\\\]+)`);
    return stripHtml(html.match(pattern)?.[1] || "");
  };
  const summary = html.match(/longBusinessSummary\\":\\"([\s\S]*?)\\",\\"fullTimeEmployees/)?.[1] || "";
  return setCached(cacheKey, {
    marketCap: field("marketCap") || escapedObject("marketCap") || "",
    trailingPE: field("trailingPE") || escapedObject("trailingPE") || "",
    forwardPE: escapedObject("forwardPE") || "",
    targetMeanPrice: field("targetMeanPrice") || escapedObject("targetMeanPrice") || "",
    recommendationKey: translateRecommendation(escapedString("recommendationKey")),
    recommendationMean: escapedObject("recommendationMean") || "",
    sector: html.match(/sector\\":\\"([^"\\]+)\\"/)?.[1] || "",
    industry: html.match(/industry\\":\\"([^"\\]+)\\"/)?.[1] || "",
    summary: summary.replace(/\\"/g, '"').replace(/\\n/g, " ").slice(0, 260),
  }, 30 * 60_000);
}

function buildQuantProfile(ticker, chart, facts = {}) {
  const closes = chart.points.map((point) => point.close).filter(Number.isFinite);
  const last = chart.regularMarketPrice || closes.at(-1);
  const p1m = closes.at(-22) || closes[0];
  const p3m = closes.at(-66) || closes[0];
  const p6m = closes.at(-132) || closes[0];
  const p1y = closes[0];
  const return1m = pctChange(last, p1m);
  const return3m = pctChange(last, p3m);
  const return6m = pctChange(last, p6m);
  const return1y = pctChange(last, p1y);
  const changes = closes.slice(1).map((close, index) => pctChange(close, closes[index]));
  const avg = changes.reduce((sum, value) => sum + value, 0) / Math.max(1, changes.length);
  const variance = changes.reduce((sum, value) => sum + (value - avg) ** 2, 0) / Math.max(1, changes.length);
  const volatility = Math.sqrt(variance) * Math.sqrt(252);
  const high = chart.meta?.fiftyTwoWeekHigh || Math.max(...closes);
  const low = chart.meta?.fiftyTwoWeekLow || Math.min(...closes);
  const rangePosition = high > low ? ((last - low) / (high - low)) * 100 : 50;
  const aboveSma50 = last >= closes.slice(-50).reduce((sum, value) => sum + value, 0) / Math.max(1, Math.min(50, closes.length));
  const momentum = clamp(50 + return3m * 1.1 + return6m * 0.45 + (aboveSma50 ? 8 : -8));
  const risk = clamp(volatility * 1.7 + Math.abs(return1m) * 1.2);
  const quality = clamp(55 + Math.max(-15, Math.min(20, return1y / 3)) + (volatility < 28 ? 12 : volatility < 45 ? 4 : -6));
  const value = clamp(85 - rangePosition * 0.65 + (facts.forwardPE && Number(facts.forwardPE) < 25 ? 8 : 0));
  const total = clamp(Math.round(momentum * 0.34 + quality * 0.28 + value * 0.22 + (100 - risk) * 0.16));
  const currency = chart.currency || "USD";
  const modelTargetLow = last * (1 + Math.max(-0.18, Math.min(0.18, return3m / 100 - volatility / 900)));
  const modelTargetHigh = last * (1 + Math.max(-0.06, Math.min(0.28, return6m / 100 + (100 - risk) / 800)));
  const stance =
    total >= 78 && risk < 55 ? "조건부 매수 우위" :
    total >= 68 ? "관찰 후 분할 접근" :
    total <= 45 || risk > 75 ? "리스크 우선 관찰" :
    "중립 관찰";
  const modelOpinion =
    facts.recommendationKey ? `Yahoo 애널리스트 ${facts.recommendationKey}${facts.recommendationMean ? ` (${facts.recommendationMean})` : ""}` :
    total >= 78 ? "모델 판독: 매수 우위" :
    total <= 45 ? "모델 판독: 방어/축소 우위" :
    "모델 판독: 중립";
  return {
    scores: {
      total,
      momentum: Math.round(momentum),
      quality: Math.round(quality),
      value: Math.round(value),
      risk: Math.round(risk),
    },
    stance,
    analystOpinion: modelOpinion,
    targetPrice: facts.targetMeanPrice ? `Yahoo 평균 목표가 ${formatCurrencyValue(Number(facts.targetMeanPrice), currency)}` : `모델 범위 ${formatCurrencyValue(Math.min(modelTargetLow, modelTargetHigh), currency)}~${formatCurrencyValue(Math.max(modelTargetLow, modelTargetHigh), currency)}`,
    valuation: {
      per: facts.trailingPE || facts.forwardPE ? `TTM ${facts.trailingPE || "N/A"} / FWD ${facts.forwardPE || "N/A"}` : "차트 기반, 재무 PER 미확인",
      pbr: "공급자 확장 필요",
      fcfYield: "공급자 확장 필요",
    },
    quality: {
      roe: "공급자 확장 필요",
      debt: "공급자 확장 필요",
      volatility: `${volatility.toFixed(1)}%`,
    },
    memo: `${ticker}는 최근 1개월 ${return1m.toFixed(1)}%, 3개월 ${return3m.toFixed(1)}%, 6개월 ${return6m.toFixed(1)}%, 1년 ${return1y.toFixed(1)}% 흐름입니다. 현재 가격은 52주 범위의 ${rangePosition.toFixed(0)}% 지점에 있습니다.`,
    logic: [
      `3개월 모멘텀 ${return3m.toFixed(1)}%`,
      `52주 위치 ${rangePosition.toFixed(0)}%`,
      `연율 변동성 ${volatility.toFixed(1)}%`,
    ],
    warnings: [
      risk > 65 ? "변동성이 높아 분할 접근 필요" : "변동성은 관리 가능한 범위",
      rangePosition > 82 ? "52주 고점권 추격 매수 주의" : "고점권 과열은 제한적",
    ],
    checklist: [
      "최신 실적과 가이던스 확인",
      "뉴스 이벤트와 섹터 흐름 확인",
      "목표 비중과 손절 기준 선설정",
    ],
  };
}

async function getDynamicProfilePayload(tickerValue) {
  const ticker = safeTicker(tickerValue);
  const base = { ...getDefaultProfile(ticker), ...(profileSnapshots[ticker] || {}) };
  const sourceParts = ["Yahoo chart"];
  let chart;
  let facts = {};
  try {
    chart = await fetchChartPayload(ticker, "1Y");
  } catch (error) {
    return { ticker, profile: base, source: `Local fallback (${error.message})`, fetchedAt: new Date().toISOString() };
  }
  if (!ticker.endsWith(".KS") && !ticker.endsWith(".KQ")) {
    try {
      facts = await fetchYahooQuoteFacts(ticker);
      sourceParts.push("Yahoo quote page");
    } catch {
      facts = {};
    }
  }
  const quant = buildQuantProfile(ticker, chart, facts);
  const profile = {
    ...base,
    ...quant,
    sector: facts.sector || base.sector,
    industry: facts.industry || base.industry,
    marketCap: base.sector === "ETF / 자산배분" ? base.marketCap : facts.marketCap || base.marketCap,
    marketCapRank: base.sector === "ETF / 자산배분" ? base.marketCapRank : facts.marketCap ? "Yahoo 시총 데이터" : base.marketCapRank,
    marketCapBand: base.sector === "ETF / 자산배분" ? base.marketCapBand : facts.marketCap ? (/[TB]$/.test(facts.marketCap) ? "대형주/초대형주" : "확인 필요") : base.marketCapBand,
    peers: base.peers,
  };
  if (facts.summary) profile.memo = `${facts.summary} ${profile.memo}`;
  const krMatch = ticker.match(/^(\d{6})\.K[QS]$/);
  if (krMatch) {
    try {
      const company = await fetchNaverCompanyInfoPayload(krMatch[1]);
      sourceParts.push("Naver company info");
      profile.marketCap = company.marketCap || profile.marketCap;
      profile.marketCapRank = company.marketRank || profile.marketCapRank;
      profile.valuation.per = company.per !== "N/A" ? company.per : profile.valuation.per;
      profile.valuation.pbr = company.pbr !== "N/A" ? company.pbr : profile.valuation.pbr;
      profile.analystOpinion = company.sectorPer !== "N/A" ? `동일업종 PER ${company.sectorPer}배` : profile.analystOpinion;
      profile.targetPrice = company.consensusPer !== "N/A" ? `추정 PER ${company.consensusPer}배 / EPS ${company.consensusEps}` : profile.targetPrice;
      if (company.overview?.length) profile.memo = `${company.overview.join(" ")} ${profile.memo}`;
    } catch {
      // Keep chart-based profile if Naver enrichment is temporarily unavailable.
    }
  }
  return { ticker, profile, source: sourceParts.join(" + "), fetchedAt: new Date().toISOString() };
}

function getKoreanNewsFallback(tickerValue, reason = "Naver RSS unavailable") {
  const ticker = safeTicker(tickerValue || "NVDA");
  const now = Date.now();
  const rows = [
    ["AI 인프라", `${ticker} 관련 AI 데이터센터 투자 기대감이 국내 투자자 관심을 끌고 있습니다.`],
    ["실적", `${ticker} 실적 발표와 가이던스 확인 전까지 조건부 접근이 유효합니다.`],
    ["업황", "반도체와 클라우드 업황 뉴스가 동반 체크 포인트로 떠오르고 있습니다."],
    ["리스크", "최근 상승폭이 컸던 종목은 분할 접근과 비중 관리가 필요합니다."],
    ["비교", "동일 섹터 내 대체 후보와 밸류에이션을 함께 비교하는 흐름입니다."],
  ];
  return {
    source: "Naver News fallback",
    ticker,
    fallback: true,
    reason,
    fetchedAt: new Date().toISOString(),
    items: rows.map(([source, title], index) => ({
      ticker,
      title,
      link: "https://news.naver.com/",
      source,
      pubDate: new Date(now - index * 23 * 60 * 1000).toUTCString(),
    })),
  };
}

function stripHtml(value) {
  return decodeXml(String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

async function fetchNaverQuantPayload() {
  const upstream = await fetch("https://finance.naver.com/sise/sise_quant.naver", {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Naver Finance responded ${upstream.status}`);
  const buffer = Buffer.from(await upstream.arrayBuffer());
  const html = new TextDecoder("euc-kr").decode(buffer);
  const tableStart = html.indexOf('type_2"');
  const tableHtml = tableStart >= 0 ? html.slice(tableStart) : html;
  const rows = [...tableHtml.matchAll(/<tr>([\s\S]*?)<\/tr>/g)]
    .map((match) => match[1])
    .map((rowHtml) => {
      const code = rowHtml.match(/code=(\d{6})/)?.[1];
      const name = stripHtml(rowHtml.match(/class="tltle"[^>]*>([\s\S]*?)<\/a>/)?.[1]);
      const cells = [...rowHtml.matchAll(/<td[^>]*class="number"[^>]*>([\s\S]*?)<\/td>/g)].map((cell) => stripHtml(cell[1]));
      if (!code || !name || cells.length < 8) return null;
      return {
        rank: Number(stripHtml(rowHtml.match(/<td[^>]*class="no"[^>]*>([\s\S]*?)<\/td>/)?.[1])) || null,
        code,
        ticker: `${code}.KS`,
        name,
        price: cells[0],
        change: cells[1],
        changeRate: cells[2],
        volume: cells[3],
        tradingValue: cells[4],
        bid: cells[5],
        ask: cells[6],
        marketCap: cells[7],
        per: cells[8] || "N/A",
        roe: cells[9] || "N/A",
      };
    })
    .filter(Boolean)
    .slice(0, 30);

  return {
    source: "Naver Finance 거래상위",
    market: "KOSPI",
    items: rows,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchJudalFundFlowPayload(typeValue = "fundBuy") {
  const type = typeValue === "fundSell" ? "fundSell" : "fundBuy";
  const upstream = await fetch(`https://www.judal.co.kr/?view=stockList&type=${type}`, {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Judal responded ${upstream.status}`);
  const html = await upstream.text();
  const rows = [...html.matchAll(/<tr style="border-color:#bcd0c7 !important">([\s\S]*?)<\/tr>/g)]
    .map((match, index) => {
      const rowHtml = match[1];
      const code = rowHtml.match(/code=(\d{6})/)?.[1];
      const name = stripHtml(rowHtml.match(/<b style='font-size:\.95em'>([\s\S]*?)<\/b>/)?.[1]);
      const market = stripHtml(rowHtml.match(/<span style="color:#555;font-size:0\.8em;">([\s\S]*?)<\/span>/)?.[1]).split(" ")[0] || "KRX";
      const info = stripHtml(rowHtml.match(/data-bs-toggle="tooltip" title="([\s\S]*?)"/)?.[1]);
      const cells = [...rowHtml.matchAll(/<td[\s\S]*?>([\s\S]*?)<\/td>/g)].map((cell) => stripHtml(cell[1]));
      const themes = [...rowHtml.matchAll(/btn-outline-success[\s\S]*?>([^<]+)<\/a>/g)].map((theme) => stripHtml(theme[1]));
      if (!code || !name || cells.length < 16) return null;
      return {
        rank: index + 1,
        type,
        side: type === "fundBuy" ? "비중확대" : "비중축소",
        code,
        ticker: `${code}.KS`,
        name,
        market,
        amount: cells[0],
        price: cells[1],
        changeRate: cells[2],
        threeDay: cells[3],
        week52Range: cells[4],
        week52Return: cells[5],
        week52Alienation: cells[6],
        year3Index: cells[10],
        expectedReturn: cells[11],
        pbr: cells[12],
        per: cells[13],
        eps: cells[14],
        marketCap: cells[15],
        volumeIndexToday: cells[16] || "",
        volumeIndex7d: cells[17] || "",
        themes,
        updated: cells.at(-1) || "",
        info,
      };
    })
    .filter(Boolean)
    .slice(0, 30);

  return {
    source: type === "fundBuy" ? "Judal 연기금 순매수" : "Judal 연기금 순매도",
    type,
    items: rows,
    fetchedAt: new Date().toISOString(),
  };
}

function extractFirst(pattern, text, fallback = "") {
  const match = text.match(pattern);
  return match ? stripHtml(match[1]) : fallback;
}

async function fetchNaverCompanyInfoPayload(codeValue) {
  const code = String(codeValue || "").replace(/\D/g, "").slice(0, 6);
  if (!code) throw new Error("Naver company code is required");
  const upstream = await fetch(`https://finance.naver.com/item/coinfo.naver?code=${code}`, {
    headers: { "User-Agent": "Mozilla/5.0 SYMarketWorkbook/1.0" },
  });
  if (!upstream.ok) throw new Error(`Naver company info responded ${upstream.status}`);
  const buffer = Buffer.from(await upstream.arrayBuffer());
  const html = new TextDecoder("euc-kr").decode(buffer);
  const title = extractFirst(/<title>([\s\S]*?)<\/title>/, html).replace(/\s*:\s*Npay 증권.*/, "");
  const summaryBlock = html.match(/<div id="summary_info"[\s\S]*?<\/div>\s*<span class="bg_lt">/)?.[0] || "";
  const overview = [...summaryBlock.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((match) => stripHtml(match[1])).filter(Boolean);
  const marketCapRaw = html.match(/<em id="_market_sum">([\s\S]*?)<\/em>억원/)?.[1] || "";
  const marketCap = `${stripHtml(marketCapRaw)}억원`.replace(/\s+/g, " ");
  const marketRank = extractFirst(/시가총액순위[\s\S]*?<\/th><td>([\s\S]*?)<\/td>/, html);
  const shares = extractFirst(/상장주식수<\/th>\s*<td><em>([\s\S]*?)<\/em>/, html);
  const foreignLimit = extractFirst(/외국인소진율\(B\/A\)[\s\S]*?<td><em>([\s\S]*?)<\/em>/, html);
  const per = extractFirst(/<em id="_per">([\s\S]*?)<\/em>배/, html, "N/A");
  const eps = extractFirst(/<em id="_eps">([\s\S]*?)<\/em>원/, html, "N/A");
  const consensusPer = extractFirst(/<em id="_cns_per">([\s\S]*?)<\/em>배/, html, "N/A");
  const consensusEps = extractFirst(/<em id="_cns_eps">([\s\S]*?)<\/em>원/, html, "N/A");
  const pbrBlock = html.match(/PBR[\s\S]*?<td>([\s\S]*?)<\/td>/)?.[1] || "";
  const pbrValues = [...pbrBlock.matchAll(/<em>([\s\S]*?)<\/em>/g)].map((match) => stripHtml(match[1]));
  const pbr = pbrValues[0] || "N/A";
  const bps = pbrValues[1] || "N/A";
  const dividend = extractFirst(/배당수익률[\s\S]*?<td>\s*<em>([\s\S]*?)<\/em>/, html, "N/A");
  const sectorPer = extractFirst(/동일업종 PER[\s\S]*?<td>\s*<em>([\s\S]*?)<\/em>배/, html, "N/A");
  const sectorChange = extractFirst(/동일업종 등락률[\s\S]*?<td[^>]*><em>([\s\S]*?)<\/em>/, html, "N/A");
  return {
    source: "Naver Finance 기업정보",
    code,
    ticker: `${code}.KS`,
    name: title || code,
    overview,
    marketCap,
    marketRank,
    shares,
    foreignLimit,
    per,
    eps,
    consensusPer,
    consensusEps,
    pbr,
    bps,
    dividend,
    sectorPer,
    sectorChange,
    fetchedAt: new Date().toISOString(),
  };
}

module.exports = {
  fetchChartPayload,
  fetchQuotesPayload,
  fetchGoogleNewsPayload,
  fetchNaverNewsPayload,
  getKoreanNewsFallback,
  fetchNaverQuantPayload,
  fetchJudalFundFlowPayload,
  fetchNaverCompanyInfoPayload,
  getProfilePayload,
  getDynamicProfilePayload,
  safeTicker,
};
