import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from '../../components/Loading';
import { Nav } from '../../components/Nav';
import { Methods } from '../../components/Methods/Methods';
import { useApi } from '../../utils/use-api';
import { Helmet } from 'react-helmet';

/**
 * The console stylegan2ada page component.
 *
 * @return {HTML} 
 */
const StyleGan2ADA = () => {
  const [data, setData] = useState(false);
  const { isLoading, getAccessTokenSilently } = useAuth0();

  // Fetch stylegan2ada models
  const url_prefix = `${process.env.GATSBY_AUDIENCE}/api/v1/stylegan2ada/`;

  useEffect(() => {
    const fetchData = async () => {
      const state = await useApi(
        null,
        `${url_prefix}methods`,
        getAccessTokenSilently,
      );
      if (state.data) {
        setData(state.data);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, url_prefix]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-gray-900">
      <Helmet>
        <title>WebDesig(a)n - StyleGan2ADA</title>
      </Helmet>
      <Nav />

      <section className="max-w-7xl m-auto mt-12">
        <Methods
          getAccessTokenSilently={getAccessTokenSilently}
          data={data}
          url_prefix={url_prefix}
        />
        <p className="text-blue-400 fixed bottom-80 right-0 left-0 text-center mb-6 opacity-10">
          &ldquo;I kept dreaming of a world I thought I'd never see. And then,
          one day... I got in.&rdquo;
        </p>
        <section className="grid-container fixed animate-pulse" />
      </section>
    </div>
  );
};

export default withAuthenticationRequired(StyleGan2ADA);
