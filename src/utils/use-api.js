export const postApi = async (data, url, getAccessTokenSilently) => {
    let state = {
        error: null,
        data: null
    };
    try {
        const audience = process.env.GATSBY_AUDIENCE;
        const scope = 'use:all';
        const accessToken = await getAccessTokenSilently({ audience, scope });

        let fetchObject = data ? {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data)
        } : {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          
          }
        }
        
        const res = await fetch(url, fetchObject);
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