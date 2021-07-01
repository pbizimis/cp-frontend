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
import { Form } from "../components/Form"

const models = [
  {
    title: "Request time off",
    id: "a",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Benefits",
    id: "b",
    href: "#",
    icon: BadgeCheckIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    id: "c",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Payroll",
    id: "d",
    href: "#",
    icon: CashIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    id: "e",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Training",
    id: "f",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Model({ id, onClick, getAccessTokenSilently }) {
  const model = models.find(model => model.id === id)
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
        key={model.title}
        layoutId={`container-${model.id}`}
        transition={{ duration: 0.5, delay: 0 }}
        className="rounded-lg sm:rounded-tr-none absolute z-40 inset-0 bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
      >
        <motion.div>
          <motion.span
            layoutId={`title-icon-${model.id}`}
            className={classNames(
              model.iconBackground,
              model.iconForeground,
              "rounded-lg inline-flex p-3 ring-4 ring-white"
            )}
          >
            <model.icon className="h-6 w-6" aria-hidden="true" />
          </motion.span>
        </motion.div>
        <motion.div className="inline-flex flex-col items-start mt-6">
          <motion.h3
            className="text-2xl font-medium"
            style={{ lineHeight: 1 }}
            layoutId={`title-text-${model.id}`}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {model.title}
          </motion.h3>
          <motion.p
            layout
            className="mt-2 text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Doloribus dolores nostrum quia qui natus officia quod et dolorem.
            Sit repellendus qui ut at blanditiis et quo et molestiae.
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
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Form
            setApiLoading={setApiLoading}
            setApiData={setApiData}
            getAccessTokenSilently={getAccessTokenSilently}
          />
          {apiLoading === true && <h1>Loading</h1>}
          {apiData !== null && (
            <div>
              <h1>Model {apiData["model"]["name"]}</h1>
              <h1>Truncation Value{apiData["truncation"]}</h1>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export function Models({ getAccessTokenSilently }) {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <AnimateSharedLayout type="crossfade">
      <div className="mx-12 rounded-lg bg-gray-200 overflow-hidden shadow-2xl divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px relative">
        {models.map((model, modelIdx) => (
          <motion.div
            key={model.title}
            layoutId={`container-${model.id}`}
            onClick={() => setSelectedId(model.id)}
            className={classNames(
              modelIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              modelIdx === 1 ? "sm:rounded-tr-lg" : "",
              modelIdx === models.length - 2 ? "sm:rounded-bl-lg" : "",
              modelIdx === models.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer"
            )}
          >
            <motion.div>
              <motion.span
                layoutId={`title-icon-${model.id}`}
                className={classNames(
                  model.iconBackground,
                  model.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <model.icon className="h-6 w-6" aria-hidden="true" />
              </motion.span>
            </motion.div>
            <motion.div className="inline-flex flex-col items-start mt-6">
              <motion.h3
                className="text-2xl font-medium"
                style={{ lineHeight: 1 }}
                layoutId={`title-text-${model.id}`}
              >
                {model.title}
              </motion.h3>
              <motion.p layout className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
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
            />
          )}
        </AnimatePresence>
      </div>
    </AnimateSharedLayout>
  )
}
