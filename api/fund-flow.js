const { fetchJudalFundFlowPayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    response.status(200).json(await fetchJudalFundFlowPayload(url.searchParams.get("type") || "fundBuy"));
  } catch (error) {
    response.status(502).json({ error: "fund_flow_fetch_failed", message: error.message });
  }
};
