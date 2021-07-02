import React, { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { DiscreteSlider } from "./Slider"
import { postApi } from "../utils/use-api"
import { useForm, Controller } from "react-hook-form"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Dropdown({ data, control }) {
  const [selected, setSelected] = useState(data.options[data.default])

  return (
    <div className="sm:col-span-6">
      <label className="block text-sm font-medium text-gray-700">
        {data.name}
      </label>
      <Controller
        control={control}
        name={data.name.toLowerCase()}
        defaultValue={selected}
        render={({ field: { onChange } }) => (
          <Listbox
            value={selected}
            onChange={e => {
              onChange(e)
              setSelected(e)
            }}
          >
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{selected}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {data.options.map(option => (
                        <Listbox.Option
                          key={option}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-8 pr-4"
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {option}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )}
      />
    </div>
  )
}

function Slider({ data, control }) {
  return (
    <div className="sm:col-span-6">
      <label className="block text-sm font-medium text-gray-700">
        {data.name}
      </label>
      <Controller
        control={control}
        name={data.name.toLowerCase()}
        defaultValue={data.default}
        render={({ field: { onChange } }) => (
          <DiscreteSlider
            defaultValue={data.default}
            min={data.min}
            max={data.max}
            step={data.step}
            onChange={onChange}
          />
        )}
      />
    </div>
  )
}

export function Form({
  formOptions,
  setApiLoading,
  setApiData,
  getAccessTokenSilently,
}) {
  const { control, handleSubmit } = useForm()

  const url = process.env.GATSBY_AUDIENCE + formOptions.http.url
  const options = formOptions.http.options

  const fetchData = async (data, event, url, options) => {
    event.preventDefault()
    setApiLoading(true)
    const state = await postApi(data, url, options, getAccessTokenSilently)
    setApiLoading(false)
    setApiData(state.data)
  }

  function buildForm() {
    let componentList = new Array(Object.keys(formOptions).length - 1).fill(0)

    for (var key in formOptions) {
      if (formOptions[key].type == "dropdown") {
        componentList[formOptions[key].place - 1] = (
          <Dropdown data={formOptions[key]} control={control} />
        )
      } else if (formOptions[key].type == "slider") {
        componentList[formOptions[key].place - 1] = (
          <Slider data={formOptions[key]} control={control} />
        )
      }
    }
    return componentList
  }

  return (
    <form
      className="space-y-8 divide-y divide-gray-200 max-w-7xl m-auto mt-24"
      onSubmit={handleSubmit(
        async (data, event) => await fetchData(data, event, url, options)
      )}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {buildForm().map(component => (<>{ component }</>))}
          </div>
        </div>
      </div>

      <div className="pt-5 max-w-7xl m-auto">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate
          </button>
        </div>
      </div>
    </form>
  )
}
