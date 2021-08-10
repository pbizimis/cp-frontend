/**
 * Fetch a new Auth0 access token and call the API with either GET, DELETE, or POST.
 * 
 * @param {object} data 
 * @param {string} url 
 * @param {function} getAccessTokenSilently 
 * @param {string} method 
 * @returns {object}
 */
export const useApi = async (data, url, getAccessTokenSilently, method = 'POST') => {
  let state = {
    error: null,
    data: null,
  };
  try {
    const audience = process.env.GATSBY_AUDIENCE;
    const scope = 'use:all';
    const accessToken = await getAccessTokenSilently({ audience, scope });

    const fetchObject = data ? {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    } : {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,

      },
    };

    const res = await fetch(url, fetchObject);
    state = {
      ...state,
      data: await res.json(),
      error: null,
    };
  } catch (error) {
    state = {
      ...state,
      error,
    };
  }
  return state;
};
