const { fetchJudalThemeListPayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  const url = new URL(request.url, "http://localhost");
  try {
    response.status(200).json(await fetchJudalThemeListPayload(url.searchParams.get("type") || "expectRateDesc"));
  } catch (error) {
    response.status(502).json({ error: "theme_list_fetch_failed", message: error.message });
  }
};
