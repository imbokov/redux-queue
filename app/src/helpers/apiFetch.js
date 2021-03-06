import Cookies from "js-cookie";

const apiFetch = async (resource, { body, headers, ...init } = {}) => {
  const response = await fetch(`/api/${resource}`, {
    ...init,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: {
      "Content-type": "application/json",
      "X-CSRFTOKEN": Cookies.get("csrftoken"),
      ...headers,
    },
  });

  if (response.status === 204) {
    return;
  } else if (response.ok) {
    return await response.json();
  }

  const errorResult = { status: response.status };
  try {
    errorResult.content = await response.json();
  } catch (e) {
    throw errorResult;
  }

  throw errorResult;
};

export default apiFetch;
