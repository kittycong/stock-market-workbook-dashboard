const { fetchQuotesPayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const tickers = url.searchParams.get("tickers") || "NVDA,MSFT,AAPL,AMZN,GOOGL,AVGO,NOW,ORCL,000660.KS";
    response.status(200).json(await fetchQuotesPayload(tickers));
  } catch (error) {
    response.status(502).json({ error: "quotes_fetch_failed", message: error.message });
  }
};
