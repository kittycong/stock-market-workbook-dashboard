const { fetchNaverQuantPayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  try {
    response.status(200).json(await fetchNaverQuantPayload());
  } catch (error) {
    response.status(502).json({ error: "kospi_quant_fetch_failed", message: error.message });
  }
};
