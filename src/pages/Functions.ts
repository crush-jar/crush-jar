export const callPostApi = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", 
    mode: "cors", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return response.json().then(res => res.access_token); 
}
