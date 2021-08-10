import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheckIcon, XIcon } from '@heroicons/react/outline';
import { Form } from '../Form/Form';

/**
 * A method component that renders a Form with method specific options.
 *
 * @export
 * @param {integer} id
 * @param {function} onClick
 * @param {function} getAccessTokenSilently
 * @param {object} methods
 * @return {HTML} 
 */
export function Method({
  id, onClick, getAccessTokenSilently, methods,
}) {
  const model = methods.find((model) => model.name === id);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        className="fixed inset-0 top-16 z-30 bg-indigo-500 cursor-pointer"
        onClick={onClick}
      />
      <motion.div
        key={model.name}
        layoutId={`container-${model.name}`}
        transition={{ duration: 0.5, delay: 0 }}
        className="rounded-lg max-w-5xl m-auto flex flex-col fixed z-40 top-28 right-4 left-4 bottom-12 md:right-8 md:left-8 bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
      >
        <motion.div>
          <motion.span
            layoutId={`title-icon-${model.name}`}
            className="rounded-lg inline-flex p-3 ring-4 ring-white text-purple-700 bg-purple-50"
          >
            <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
          </motion.span>
        </motion.div>
        <motion.div layout className="inline-flex flex-col items-start mt-6">
          <motion.h3
            className="text-2xl font-medium"
            style={{ lineHeight: 1 }}
            layout
            layoutId={`title-text-${model.name}`}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {model.name}
          </motion.h3>
          <motion.p
            layout
            className="mt-2 text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {model.description}
          </motion.p>
        </motion.div>
        <motion.button
          onClick={onClick}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white absolute top-6 right-6 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        >
          <span className="sr-only">Close menu</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </motion.button>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          transition={{ duration: 0.5, delay: 1 }}
          className="h-full overflow-hidden mt-12"
        >
          <Form
            method={model}
            setApiLoading={setApiLoading}
            setApiData={setApiData}
            getAccessTokenSilently={getAccessTokenSilently}
          />
          {(apiLoading === true || apiData !== null) && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="rounded-lg w-full h-full bg-gray-900 flex flex-col justify-center items-center overflow-hidden">
                <button
                  onClick={() => {
                    setApiData(null)
                    setApiLoading(false)
                  }}
                  className="bg-white absolute z-50 top-6 right-6 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {apiLoading === true && (
                  <div>
                    <div className="absolute top-8 text-lg text-white">
                      <h1>Loading...</h1>
                    </div>
                    <div className="bg-gray-900 flex justify-center items-center h-full">
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="flex justify-center items-center text-gray-300">
                          <svg
                            fill="none"
                            className="w-24 h-24 animate-spin"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                              fill="currentColor"
                              fillRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {apiData !== null && Object.keys(apiData).length === 2 && (
                  <>
                    <div className="absolute top-8 text-lg text-white">
                      <h1>Generated</h1>
                    </div>
                    <img
                      alt=""
                      src={apiData.url_prefix + apiData.result_image}
                    />
                  </>
                )}

                {apiData !== null && Object.keys(apiData).length === 4 && (
                  <div className="bg-gray-900 overflow-y-auto w-full flex flex-col items-center h-full">
                    <div className="text-lg text-white rounded-lg bg-gray-900 w-full flex justify-center items-center pt-8 md:pt-4 pb-20 md:pb-8">
                      <h1>StyleMix Result</h1>
                    </div>
                    <div className="grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-16 md:gap-6 relative m-auto">
                      <div className="md:col-start-2 md:row-start-2 relative md:border-l-2 md:border-t-2 rounded-lg border-gray-200 border-4 md:mb-12">
                        <h1 className="absolute -top-8 right-0 left-0 text-center text-white">
                          Result Image
                        </h1>
                        <img
                          alt=""
                          src={apiData.url_prefix + apiData.result_image}
                        />
                      </div>
                      <div className="md:col-start-1 md:row-start-2 relative md:border-l-2 md:border-t-2 rounded-lg border-gray-200 border-4 md:mb-12">
                        <h1 className="absolute -top-8 right-0 left-0 text-center text-white">
                          Row Image
                        </h1>
                        <img
                          alt=""
                          src={apiData.url_prefix + apiData.row_image}
                        />
                      </div>
                      <div className="md:col-start-2 md:row-start-1 relative md:border-l-2 md:border-t-2 rounded-lg border-gray-200 border-4 mb-12 md:mb-2">
                        <h1 className="absolute -top-8 right-0 left-0 text-center text-white">
                          Column Image
                        </h1>
                        <img
                          alt=""
                          src={apiData.url_prefix + apiData.col_image}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
