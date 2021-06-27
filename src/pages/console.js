import React, { useState } from "react"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from '../components/Loading';
import { Nav } from '../components/Nav';
import { postApi } from '../utils/use-api';

const Console = () => {

  const { isLoading, getAccessTokenSilently } = useAuth0();

  const [ apiLoading, setApiLoading ] = useState(false);
  const [ apiData, setApiData ] = useState(null);

  const url = "https://testapi-service-mdvcgw37oq-ew.a.run.app/api/v1/generate/protected";
  const options = {
    audience: process.env.GATSBY_AUDIENCE,
    scope: 'use:all',
  };

  const fetchData = async (url, options) => {
    setApiLoading(true);
    const state = await postApi(url, options, getAccessTokenSilently);
    setApiLoading(false);
    setApiData(state.data);
  }


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <button
        className="text-black"
        onClick={() => fetchData(url, options)}
      >
        API CALL
    </button>
    {apiLoading === true &&
      <h1>Loading</h1>
    }
    {apiData !== null &&
    <h1>{apiData["message"]}</h1>
    }

    </div>
  );
};

export default withAuthenticationRequired(Console);