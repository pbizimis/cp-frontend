import React, { Fragment, useState } from "react"
import { Listbox, Transition, Disclosure } from "@headlessui/react"
import { CheckIcon, SelectorIcon, PencilIcon } from "@heroicons/react/solid"
import { DiscreteSlider } from "./Slider"
import { postApi } from "../utils/use-api"
import { useForm, Controller } from "react-hook-form"
import TextField from "@material-ui/core/TextField"
import { UserImages } from "./UserImages"
import Flyout from "../components/Flyout"

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function Dropdown({ data, control }) {
  const [selected, setSelected] = useState(data.options[data.default])
  return (
    <div className="sm:col-span-6">
      <div className="flex gap-4">
      <label className="block text-sm font-medium text-gray-700">
        {data.name}
      </label>
      <Flyout name={data.name} description={data.description} />
      </div>
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
                    {data.name.toLowerCase() === "model" && (
                      <span className="block truncate">
                        Model ({selected.img}k images, Resolution {selected.res}
                        , FID {selected.fid})
                      </span>
                    )}
                    {data.name.toLowerCase() !== "model" && (
                      <span className="block truncate">{selected}</span>
                    )}
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
                          key={option.img + option.res + option.fid}
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
                              {data.name.toLowerCase() === "model" && (
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  Model ({option.img}k images, Resolution{" "}
                                  {option.res}, FID {option.fid})
                                </span>
                              )}
                              {data.name.toLowerCase() !== "model" && (
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {option}
                                </span>
                              )}

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

export function Slider({ data, control }) {
  return (
    <div className="sm:col-span-6">
      <div className="flex gap-4">
      <label className="block text-sm font-medium text-gray-700">
        {data.name}
      </label>
      <Flyout name={data.name} description={data.description} />
      </div>
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

export function Text({ data, control }) {
  return (
    <div className="sm:col-span-6">
      <div className="flex gap-4">
      <label className="block text-sm font-medium text-gray-700">
        {data.name}
      </label>
      <Flyout name={data.name} description={data.description} />
      </div>
      <Controller
        control={control}
        name={data.name.toLowerCase()}
        defaultValue={data.default}
        render={({ field: { onChange } }) => (
          <>
            <TextField
              defaultValue={data.default}
              id="outlined-basic"
              onChange={onChange}
            />
          </>
        )}
      />
    </div>
  )
}

export function UserImagesDisclosure({ currentImage, onChange, radioForm }) {
  return (
    <div className="sm:col-span-6">
      <Disclosure>
        {({ open }) => (
          <>
            {!currentImage && (
              <Disclosure.Button className="mt-1 p-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Choose from personal collection</span>
              </Disclosure.Button>
            )}
            {currentImage && (
              <Disclosure.Button className="relative mt-1 p-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <PencilIcon className="absolute hover:opacity-80 hover:bg-opacity-50 hover:bg-purple-400 opacity-0 p-24" />
                <img
                  alt=""
                  src={process.env.GATSBY_IMAGE_BUCKET + currentImage}
                />
              </Disclosure.Button>
            )}
            <Disclosure.Panel className="fixed inset-0 bg-red-800 bg-opacity-20 z-50 flex justify-center items-center">
              <div className="relative w-10/12 bg-white p-12 rounded-lg h-1/2">
                <Disclosure.Button className="absolute right-2 top-6 mx-4 p-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Close</span>
                </Disclosure.Button>
                <div className="overflow-y-auto h-full">
                  <UserImages onChange={onChange} radioForm={radioForm} />
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export function ToggleTextOrImage({ data, control, reset }) {
  const [enabled, setEnabled] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  return (
    <div className="sm:col-span-6">
      <div className="flex gap-4">
      <label className="block text-sm font-medium text-gray-700">
        {data.name.replace("_", " ")}
      </label>
      <Flyout name={data.name.replace("_", " ")} description={data.description} />
      </div>
      <div className="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          onClick={(e) => {
            e.preventDefault()
            setEnabled(true)
            setCurrentImage("")
            if (!enabled) {
              reset(data.name.toLowerCase(), "")
            }
          }}
          className={classNames(
            enabled
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
          )}
        >
          Seed
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            setEnabled(false)
            if (enabled) {
              setCurrentImage("")
              reset(data.name.toLowerCase(), "")
            }
          }}
          className={classNames(
            !enabled
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
          )}
        >
          Image
        </button>
      </div>
      <div className="sm:col-span-6">
        <Controller
          control={control}
          name={data.name.toLowerCase()}
          render={({ field: { onChange } }) => (
            <>
              {enabled && (
                <TextField
                  defaultValue={data.default}
                  id="outlined-basic"
                  onChange={e => {
                    onChange(e)
                  }}
                />
              )}
              {!enabled && (
                <div className="flex">
                  <UserImagesDisclosure
                    currentImage={currentImage}
                    onChange={e => {
                      onChange(e)
                      setCurrentImage(e)
                    }}
                    radioForm={true}
                  />
                </div>
              )}
            </>
          )}
        />
      </div>
    </div>
  )
}

export function Form({
  method,
  setApiLoading,
  setApiData,
  getAccessTokenSilently,
}) {
  const { control, handleSubmit, setValue } = useForm()

  const url = method.url

  const fetchData = async (data, event, url) => {
    event.preventDefault()
    setApiLoading(true)
    const state = await postApi(data, url, getAccessTokenSilently)
    setApiLoading(false)
    setApiData(state.data)
  }

  function buildForm() {
    let formOptions = method.method_options
    let componentList = new Array(Object.keys(formOptions).length - 1).fill(0)

    for (var key in formOptions) {
      if (formOptions[key].type === "dropdown") {
        let options = []
        formOptions[key].options.map(model => options.push(model))
        formOptions[key].options = options

        componentList[formOptions[key].place - 1] = (
          <Dropdown data={formOptions[key]} control={control} />
        )
      } else if (formOptions[key].type === "slider") {
        componentList[formOptions[key].place - 1] = (
          <Slider data={formOptions[key]} control={control} />
        )
      } else if (formOptions[key].type === "seed_or_image") {
        componentList[formOptions[key].place - 1] = (
          <ToggleTextOrImage
            data={formOptions[key]}
            control={control}
            reset={setValue}
          />
        )
      } else if (formOptions[key].type === "text") {
        componentList[formOptions[key].place - 1] = (
          <Text data={formOptions[key]} control={control} />
        )
      }
    }
    return componentList
  }

  return (
    <form
      className="space-y-4 max-w-7xl m-auto h-full flex flex-col overflow-hidden"
      onSubmit={handleSubmit(
        async (data, event) => await fetchData(data, event, url)
      )}
    >
      <div className="overflow-y-auto pr-2 pl-2 pb-6 border-gray-200 border-4 rounded-md">
        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {buildForm().map((component, index) => (
              <React.Fragment key={index}>{component}</React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl m-auto">
        <button
          type="submit"
          className="py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate
        </button>
      </div>
    </form>
  )
}
