const { fetchChartPayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const payload = await fetchChartPayload(url.searchParams.get("ticker"), url.searchParams.get("range") || "1D");
    response.status(200).json(payload);
  } catch (error) {
    response.status(502).json({ error: "chart_fetch_failed", message: error.message });
  }
};
