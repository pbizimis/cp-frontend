import './src/styles/global.css';
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

// const onRedirectCallback = (appState) => navigate(appState?.returnTo || '/');

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_DOMAIN}
      clientId={process.env.GATSBY_CLIENT_ID}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  );
};