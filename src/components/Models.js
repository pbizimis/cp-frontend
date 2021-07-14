import React, { useState } from "react"
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion"
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline"
import { Form } from "./Form"
import { Loading } from "../components/Loading"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Model({ id, onClick, getAccessTokenSilently, methods }) {
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
        className="rounded-lg sm:rounded-tr-none absolute z-40 top-0 right-0 left-0 min-h-full bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
      >
        <motion.div>
          <motion.span
            layoutId={`title-icon-${model.name}`}
            className={"rounded-lg inline-flex p-3 ring-4 ring-white text-purple-700 bg-purple-50"}
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
        >
          <Form
            method={model}
            setApiLoading={setApiLoading}
            setApiData={setApiData}
            getAccessTokenSilently={getAccessTokenSilently}
          />
          {apiLoading === true && <h1>Loading</h1>}
          {apiData !== null && (
            <div>
              <h1>Model {apiData["model"]}</h1>
              <h1>Truncation Value{apiData["truncation"]}</h1>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export function Models({ getAccessTokenSilently, data, url_prefix }) {
  const [selectedId, setSelectedId] = useState(null)

  let methods = [];

  if (data) {
    for (let method in data) {
      data[method]["url"] = url_prefix + data[method].name.toLowerCase()
      methods.push(data[method]);
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
                className={"rounded-lg inline-flex p-3 ring-4 ring-white bg-purple-50 text-purple-700"}
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
            <Model
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
