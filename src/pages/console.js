import React, { useState } from "react"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from '../components/Loading';
import { Nav } from '../components/Nav';
import { Form } from "../components/Form"

const Console = () => {

  const { isLoading, getAccessTokenSilently } = useAuth0();

  const [ apiLoading, setApiLoading ] = useState(false);
  const [ apiData, setApiData ] = useState(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <Form setApiLoading={setApiLoading} setApiData={setApiData} getAccessTokenSilently={getAccessTokenSilently}/>
          
    {apiLoading === true &&
      <h1>Loading</h1>
    }
    {apiData !== null &&
    <div>
    <h1>Model {apiData["model"]["name"]}</h1>
    <h1>Truncation Value{apiData["truncation"]}</h1>
    </div>
    }

    </div>
  );
};

export default withAuthenticationRequired(Console);