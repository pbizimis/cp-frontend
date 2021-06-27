export const postApi = async (url, options, getAccessTokenSilently) => {
    let state = {
        error: null,
        data: null
    };
    try {
        const { audience, scope, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        state = {
            ...state,
          data: await res.json(),
          error: null,
        };
       } catch(error) {
          state = {
            ...state,
            error
          }
    };
    return state;
};