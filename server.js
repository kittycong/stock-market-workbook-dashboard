const http = require("http");
const fs = require("fs");
const path = require("path");
const {
  fetchChartPayload,
  fetchQuotesPayload,
  fetchGoogleNewsPayload,
  fetchNaverNewsPayload,
  getKoreanNewsFallback,
  fetchNaverQuantPayload,
  fetchJudalFundFlowPayload,
  fetchNaverCompanyInfoPayload,
  getProfilePayload,
} = require("./market-utils");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

async function handleChart(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    sendJson(response, 200, await fetchChartPayload(url.searchParams.get("ticker"), url.searchParams.get("range") || "1D"));
  } catch (error) {
    sendJson(response, 502, { error: "chart_fetch_failed", message: error.message });
  }
}

async function handleNews(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const source = url.searchParams.get("source") || "google";
  const ticker = url.searchParams.get("ticker") || "NVDA";
  try {
    const payload = source === "naver" ? await fetchNaverNewsPayload(ticker) : await fetchGoogleNewsPayload(ticker);
    sendJson(response, 200, payload);
  } catch (error) {
    if (source === "naver") {
      sendJson(response, 200, getKoreanNewsFallback(ticker, error.message));
      return;
    }
    sendJson(response, 502, { error: "news_fetch_failed", message: error.message, source, ticker });
  }
}

async function handleQuotes(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    sendJson(response, 200, await fetchQuotesPayload(url.searchParams.get("tickers") || ""));
  } catch (error) {
    sendJson(response, 502, { error: "quotes_fetch_failed", message: error.message });
  }
}

function handleProfile(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  sendJson(response, 200, getProfilePayload(url.searchParams.get("ticker") || "NVDA"));
}

async function handleKospiQuant(request, response) {
  try {
    sendJson(response, 200, await fetchNaverQuantPayload());
  } catch (error) {
    sendJson(response, 502, { error: "kospi_quant_fetch_failed", message: error.message });
  }
}

async function handleFundFlow(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    sendJson(response, 200, await fetchJudalFundFlowPayload(url.searchParams.get("type") || "fundBuy"));
  } catch (error) {
    sendJson(response, 502, { error: "fund_flow_fetch_failed", message: error.message });
  }
}

async function handleCompanyInfo(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    sendJson(response, 200, await fetchNaverCompanyInfoPayload(url.searchParams.get("code") || ""));
  } catch (error) {
    sendJson(response, 502, { error: "company_info_fetch_failed", message: error.message });
  }
}

function serveStatic(request, response) {
  let route = decodeURIComponent(request.url.split("?")[0]);
  if (route === "/") route = "/index.html";
  const file = path.join(ROOT, route);
  if (!file.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
    });
    response.end(data);
  });
}

http
  .createServer((request, response) => {
    const route = request.url.split("?")[0];
    if (route === "/api/chart") {
      handleChart(request, response);
      return;
    }
    if (route === "/api/news") {
      handleNews(request, response);
      return;
    }
    if (route === "/api/quotes") {
      handleQuotes(request, response);
      return;
    }
    if (route === "/api/profile") {
      handleProfile(request, response);
      return;
    }
    if (route === "/api/kospi-quant") {
      handleKospiQuant(request, response);
      return;
    }
    if (route === "/api/fund-flow") {
      handleFundFlow(request, response);
      return;
    }
    if (route === "/api/company-info") {
      handleCompanyInfo(request, response);
      return;
    }
    serveStatic(request, response);
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`SY Market Workbook running at http://127.0.0.1:${PORT}`);
  });
