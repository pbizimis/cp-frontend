import React from "react"
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from '../components/Loading';
import { Nav } from '../components/Nav';

const Console = () => {

  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Nav />
    </div>
  );
};

export default withAuthenticationRequired(Console);