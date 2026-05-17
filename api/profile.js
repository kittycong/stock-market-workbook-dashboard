const { getDynamicProfilePayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    response.status(200).json(await getDynamicProfilePayload(url.searchParams.get("ticker") || "NVDA"));
  } catch (error) {
    response.status(502).json({ error: "profile_fetch_failed", message: error.message });
  }
};
