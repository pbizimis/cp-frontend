import React, { useState } from "react"
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion"
import { BadgeCheckIcon, XIcon } from "@heroicons/react/outline"
import { Form } from "./Form"
import { Loading } from "./Loading"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function Method({ id, onClick, getAccessTokenSilently, methods }) {
  const model = methods.find(model => model.name === id)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiData, setApiData] = useState(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        className="fixed inset-0 top-16 z-30 bg-indigo-500 cursor-pointer"
        onClick={onClick}
      ></motion.div>
      <motion.div
        key={model.name}
        layoutId={`container-${model.name}`}
        transition={{ duration: 0.5, delay: 0 }}
        className="rounded-lg flex flex-col sm:rounded-tr-none fixed z-40 top-28 right-12 left-12 bottom-12 bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
      >
        <motion.div>
          <motion.span
            layoutId={`title-icon-${model.name}`}
            className={
              "rounded-lg inline-flex p-3 ring-4 ring-white text-purple-700 bg-purple-50"
            }
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
            <div className="absolute inset-0 flex justify-center items-center bg-gray-300 bg-opacity-25">
              <div className="rounded-lg w-5/6 h-5/6 bg-white flex justify-center items-center relative">
                <button
                  onClick={() => {
                    setApiData(null)
                    setApiLoading(false)
                  }}
                  className="bg-white absolute top-6 right-6 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {apiLoading === true && (
                  <div>
                    <div className="absolute top-8 text-lg">
                      <h1>Loading</h1>
                    </div>
                    <div className="bg-white flex justify-center items-center h-full">
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="flex justify-center items-center text-gray-500">
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
                              fill-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {apiData !== null && Object.keys(apiData).length === 2 && (
                  <>
                    <div className="absolute top-8 text-lg">
                      <h1>Generated</h1>
                    </div>
                    <img
                      alt=""
                      src={apiData.url_prefix + apiData.result_image}
                    />
                  </>
                )}

                {apiData !== null && Object.keys(apiData).length === 4 && (
                  <>
                    <div className="absolute top-8 text-lg">
                      <h1>StyleMix Result</h1>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 mt-12 border-4 border-gray-500 gap-4">
                      <div className="col-start-2 row-start-2 relative border-l-2 border-t-2 border-gray-300">
                        <h1 className="absolute bottom-0 right-0 left-0 text-center">
                          Result Image
                        </h1>
                        <img
                          alt=""
                          src={apiData.url_prefix + apiData.result_image}
                        />
                      </div>
                      <div className="col-start-1 row-start-2 relative border-r-2 border-t-2 border-gray-300">
                        <h1 className="absolute bottom-0 right-0 left-0 text-center">
                          Row Image
                        </h1>
                        <img
                          alt=""
                          src={apiData.url_prefix + apiData.row_image}
                        />
                      </div>
                      <div className="col-start-2 row-start-1 relative border-l-2 border-b-2 border-gray-300">
                        <h1 className="absolute bottom-0 right-0 left-0 text-center">
                          Column Image
                        </h1>
                        <img
                          alt=""
                          src={apiData.url_prefix + apiData.col_image}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export function Methods({ getAccessTokenSilently, data, url_prefix }) {
  const [selectedId, setSelectedId] = useState(null)

  let methods = []

  if (data) {
    for (let method in data) {
      data[method]["url"] = url_prefix + data[method].name.toLowerCase()
      methods.push(data[method])
    }
  } else {
    return <Loading />
  }

  return (
    <AnimateSharedLayout>
      <div className="mx-12 rounded-lg bg-gray-200 shadow-2xl divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px relative">
        {methods.map((model, modelIdx) => (
          <motion.div
            key={model.name}
            layoutId={`container-${model.name}`}
            onClick={() => setSelectedId(model.name)}
            className={classNames(
              modelIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              modelIdx === 1 ? "sm:rounded-tr-lg" : "",
              modelIdx === methods.length - 2 ? "sm:rounded-bl-lg" : "",
              modelIdx === methods.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer"
            )}
          >
            <motion.div>
              <motion.span
                layoutId={`title-icon-${model.name}`}
                className={
                  "rounded-lg inline-flex p-3 ring-4 ring-white bg-purple-50 text-purple-700"
                }
              >
                <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
              </motion.span>
            </motion.div>
            <motion.div
              layout
              className="inline-flex flex-col items-start mt-6"
            >
              <motion.h3
                className="text-2xl font-medium"
                style={{ lineHeight: 1 }}
                layoutId={`title-text-${model.name}`}
              >
                {model.name}
              </motion.h3>
              <motion.p
                animate={{
                  opacity: selectedId === model.name ? 0 : 1,
                  transition:
                    selectedId === model.name
                      ? { delay: 0 }
                      : { duration: 0.2, delay: 0.5 },
                }}
                className="mt-2 text-sm text-gray-500"
              >
                {model.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
        <AnimatePresence>
          {selectedId && (
            <Method
              id={selectedId}
              onClick={() => setSelectedId(null)}
              getAccessTokenSilently={getAccessTokenSilently}
              methods={methods}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimateSharedLayout>
  )
}
