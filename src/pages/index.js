import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Nav } from '../components/Nav';
import { Loading } from '../components/Loading';
import { Error } from '../components/AuthError';
import Features from '../components/Features';

/**
 * The landing page component.
 *
 * @export
 * @return {HTML} 
 */
export default function Index() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Nav />
        {error && <Error message={error.message} />}

        <main>
          <div className="pt-10 pb-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">WebDesig(a)n</span>
                      <span className="block text-indigo-400">Find Inspiration</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      WebDesig(a)n is a tool that leverages
                      {' '}
                      <strong><a href="https://thispersondoesnotexist.com/">NVIDIA's StyleGan AI</a></strong>
                      {' '}
                      to generate different web designs.
                      These designs optimally help web designers to find new ideas and inspiration.
                      The AI models are trained on thousands of website images for a diverse mix of creations.
                    </p>
                  </div>
                </div>
                <div className="mt-12 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-xl px-24 sm:max-w-2xl sm:px-32">
                    <img
                      className="w-full p-1 bg-white lg:absolute lg:inset-0 lg:max-w-lg"
                      src="https://images.webdesigan.com/80f3c3ca8f734b5e96399a0d3bb71527"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Features />
        </main>
      </div>
    </div>
  );
}
