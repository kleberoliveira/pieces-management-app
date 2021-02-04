import consentApi from "./index";

export default async (req, res) => {
  const {
    query: { url },
    method,
    body,
  } = req;

  const request = await consentApi({
    method,
    url: url.join("/"),
    body: body !== "" ? body : null,
  });

  const { data, response } = request;

  const statusCode = response ? response.status : request.status;

  if (statusCode === 200) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } else if  (statusCode === 410) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 410;
    res.end(JSON.stringify({
      "name": "Error",
      "message": "Token Expired"
    }));    
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 400;
    res.end();
  }
};
