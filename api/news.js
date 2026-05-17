const { fetchGoogleNewsPayload, fetchNaverNewsPayload, getKoreanNewsFallback } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const source = url.searchParams.get("source") || "google";
    const ticker = url.searchParams.get("ticker") || "NVDA";
    const payload = source === "naver" ? await fetchNaverNewsPayload(ticker) : await fetchGoogleNewsPayload(ticker);
    response.status(200).json(payload);
  } catch (error) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if ((url.searchParams.get("source") || "google") === "naver") {
      response.status(200).json(getKoreanNewsFallback(url.searchParams.get("ticker") || "NVDA", error.message));
      return;
    }
    response.status(502).json({ error: "news_fetch_failed", message: error.message });
  }
};
