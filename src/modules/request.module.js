export const request = async (payload) => {
  const { url, method = 'get', headers = {} } = payload;
  let { body = null } = payload;
  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }
  try {
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();
    if (!response.ok) {
      throw (data);
    }
    return data;
  } catch (error) {
    throw (error);
  }
};