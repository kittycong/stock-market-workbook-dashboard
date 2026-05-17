const rangeMap = {
  "1D": { range: "1d", interval: "5m" },
  "5D": { range: "5d", interval: "15m" },
  "1M": { range: "1mo", interval: "1d" },
  "6M": { range: "6mo", interval: "1d" },
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
  return String(value || "NVDA").replace(/[^A-Z0-9.-]/gi, "").toUpperCase().slice(0, 12) || "NVDA";
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
  return {
    source: "Yahoo Finance",
    ticker,
    range: requestedRange,
    currency: result?.meta?.currency || "USD",
    regularMarketPrice: result?.meta?.regularMarketPrice || points.at(-1).close,
    previousClose: result?.meta?.chartPreviousClose || points[0].close,
    points,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchQuotesPayload(tickerValues = []) {
  const tickers = [...new Set(
    (Array.isArray(tickerValues) ? tickerValues : String(tickerValues || "").split(","))
      .map(safeTicker)
      .filter(Boolean),
  )].slice(0, 60);
  const settled = await Promise.allSettled(
    tickers.map(async (ticker) => {
      const chart = await fetchChartPayload(ticker, "1D");
      const price = chart.regularMarketPrice;
      const previousClose = chart.previousClose;
      const change = Number.isFinite(price) && Number.isFinite(previousClose) ? price - previousClose : 0;
      const changeRate = previousClose ? (change / previousClose) * 100 : 0;
      return {
        ticker,
        source: chart.source,
        currency: chart.currency,
        price,
        previousClose,
        change,
        changeRate,
        points: chart.points.length,
        fetchedAt: chart.fetchedAt,
      };
    }),
  );
  const quotes = {};
  const errors = {};
  settled.forEach((result, index) => {
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

function getProfilePayload(tickerValue) {
  const ticker = safeTicker(tickerValue);
  const profile = profileSnapshots[ticker] || {
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
    memo: "현재 로컬 커버리지에 없는 종목입니다. 실제 데이터 공급자 연결 시 시총, 목표주가, 투자의견을 확장할 수 있습니다.",
    logic: ["가격 추세 확인", "실적 발표 확인", "동종업계 비교"],
    warnings: ["데이터 공백", "공시/뉴스 확인 필요"],
    checklist: ["최근 실적 확인", "뉴스 이벤트 확인", "비중 상한 설정"],
    peers: [],
  };
  return { ticker, profile, source: "Local coverage snapshot", fetchedAt: new Date().toISOString() };
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
  safeTicker,
};
