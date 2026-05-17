const { fetchNaverCompanyInfoPayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    response.status(200).json(await fetchNaverCompanyInfoPayload(url.searchParams.get("code") || ""));
  } catch (error) {
    response.status(502).json({ error: "company_info_fetch_failed", message: error.message });
  }
};
