const { getProfilePayload } = require("../market-utils");

module.exports = async function handler(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  response.status(200).json(getProfilePayload(url.searchParams.get("ticker") || "NVDA"));
};
