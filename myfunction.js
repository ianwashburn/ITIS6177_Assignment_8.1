exports.handler = async (event) => {
  const name = "Ian Washburn";
  const keyword = event?.queryStringParameters?.keyword ?? "";
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `${name} says ${keyword}`,
  };
};