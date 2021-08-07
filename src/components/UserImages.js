import React, { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { postApi } from "../utils/use-api"
import { Disclosure, Popover, Transition } from "@headlessui/react"
import { PlusIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"
import { RadioGroup } from "@headlessui/react"
import { useForm } from "react-hook-form"

export function sortImages(images) {
  let sortedImages = {}
  images.image_ids.map(image => {
    const imageModelVersion = image.method.model.version
    const imageModel =
      "Images " +
      image.method.model.img.toString() +
      "k, Resolution " +
      image.method.model.res.toString() +
      "px, FID " +
      image.method.model.fid.toString()

    const modelVersionIncluded = sortedImages.hasOwnProperty(imageModelVersion)

    if (!modelVersionIncluded) {
      sortedImages[imageModelVersion] = {}
    }

    const modelIncluded = sortedImages[imageModelVersion].hasOwnProperty(
      imageModel
    )

    if (!modelIncluded) {
      sortedImages[imageModelVersion][imageModel] = []
    }
    sortedImages[imageModelVersion][imageModel].push(image)
    return sortedImages
  })
  return sortedImages
}

export function ImageContainer({
  image,
  register,
  urlPrefix,
  checkboxForm,
  deleteLoading,
}) {
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(false)
  }, [checkboxForm])

  const imageContainerOnClick = () => {
    if (checkboxForm && !deleteLoading) {
      setSelected(!selected)
    }
  }

  return (
    <li key={image.url} className={"col-span-1 bg-white"}>
      <input
        type="checkbox"
        className="hidden"
        id={image.url}
        value={image.url}
        disabled={!checkboxForm}
        {...register("id_list", {})}
      />
      <label htmlFor={image.url} onClick={imageContainerOnClick}>
        <img
          alt=""
          className={`${
            selected ? "bg-blue-200" : "bg-white"
          } p-2 shadow-lg m-auto`}
          src={urlPrefix + image.url}
        ></img>
      </label>
    </li>
  )
}

export function ModelOverview({
  modelName,
  modelData,
  urlPrefix,
  register,
  radioForm,
  checkboxForm,
  deleteLoading,
}) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-normal mb-4 text-black float-left">
        Model: {modelName}
      </h1>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="mx-4 p-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <PlusIcon
                className={`${
                  open ? "transform rotate-45" : ""
                } w-5 h-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <motion.ul
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="grid grid-cols-1 lg:gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden"
              >
                {modelData.map((image, index) => (
                  <React.Fragment key={index}>
                    {radioForm && (
                      <RadioGroup.Option key={image.url} value={image.url}>
                        {({ checked }) => (
                          <li key={image.url} className="col-span-1 bg-white">
                            <img
                              alt=""
                              className={
                                checked
                                  ? "p-2 shadow-lg m-auto bg-green-400"
                                  : "p-2 shadow-lg m-auto bg-white"
                              }
                              src={urlPrefix + image.url}
                            />
                          </li>
                        )}
                      </RadioGroup.Option>
                    )}
                    {!radioForm && (
                      <ImageContainer
                        image={image}
                        register={register}
                        urlPrefix={urlPrefix}
                        checkboxForm={checkboxForm}
                        deleteLoading={deleteLoading}
                      />
                    )}
                  </React.Fragment>
                ))}
              </motion.ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export function VersionOverview({
  versionName,
  versionData,
  urlPrefix,
  register,
  radioForm,
  checkboxForm,
  deleteLoading,
}) {
  let modelOverviews = []

  for (let model in versionData) {
    modelOverviews.push(
      <ModelOverview
        modelName={model}
        modelData={versionData[model]}
        urlPrefix={urlPrefix}
        register={register}
        radioForm={radioForm}
        checkboxForm={checkboxForm}
        deleteLoading={deleteLoading}
      />
    )
  }

  return (
    <div className="mb-12">
      <h1 className="text-2xl font-medium float-left">{versionName}</h1>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="mx-4 mt-1 p-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <PlusIcon
                className={`${
                  open ? "transform rotate-45" : ""
                } w-5 h-5 text-purple-500`}
              />
            </Disclosure.Button>
            <div className="relative mt-2 mb-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <Disclosure.Panel className="px-4 text-sm">
              <motion.div
                className="overflow-hidden"
                animate={{ height: "auto" }}
                initial={{ height: 0 }}
                transition={{ duration: 0.5 }}
              >
                {modelOverviews.map((modelOverview, index) => (
                  <React.Fragment key={index}>{modelOverview}</React.Fragment>
                ))}
              </motion.div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export const UserImages = ({ onChange, radioForm, enableDeletion }) => {
  // Fetched image data
  const [data, setData] = useState(false)
  // Global urlPrefix (image hosting service)
  const [urlPrefix, setUrlPrefix] = useState(null)
  // Auth0
  const { getAccessTokenSilently } = useAuth0()
  // Form logic
  const { register, handleSubmit, reset } = useForm()
  // State for selected radio element
  const [selected, setSelected] = useState(null)
  // State if checkbox Form is enabled
  const [checkboxForm, setCheckboxForm] = useState(false)
  // State for api delete request (loading and successful)
  const [deleteSuccessful, setDeleteSuccessful] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const url = process.env.GATSBY_AUDIENCE + "/api/v1/user/images"

  // Fetch images when component is mounted
  useEffect(() => {
    const fetchData = async () => {
      const state = await postApi(null, url, getAccessTokenSilently)
      if (
        state.data &&
        "image_url_prefix" in state.data &&
        "image_ids" in state.data
      ) {
        setData(sortImages(state.data))
        setUrlPrefix(state.data.image_url_prefix)
      }
    }
    fetchData()
  }, [getAccessTokenSilently, url, deleteSuccessful])

  // Post data to delete
  const postData = async (data, url, all) => {
    setDeleteLoading(true)
    let deleteData
    if (
      (Object.keys(data).length === 0 ||
        !data.id_list ||
        data.id_list.length === 0) &&
      !all
    ) {
      setDeleteLoading(false)
      setCheckboxForm(false)
      return
    } else if (all) {
      deleteData = { all_documents: true, id_list: [] }
    } else if (typeof data.id_list === "string") {
      deleteData = { id_list: [data.id_list] }
    } else {
      deleteData = data
    }
    const state = await postApi(
      deleteData,
      url,
      getAccessTokenSilently,
      "DELETE"
    )
    setDeleteLoading(false)
    setCheckboxForm(false)
    setDeleteSuccessful(!deleteSuccessful)
  }

  // If data is not yet fetched, render loading circle
  if (!data) {
    return (
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
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  // If data is fetched build components for hierarchical rendering
  let imagesOverview = []
  for (let version in data) {
    imagesOverview.push(
      <VersionOverview
        versionName={version}
        versionData={data[version]}
        urlPrefix={urlPrefix}
        register={register}
        radioForm={radioForm}
        checkboxForm={checkboxForm}
        deleteLoading={deleteLoading}
      />
    )
  }

  // Render UserImages without the radioForm option
  if (!radioForm) {
    return (
      <form className="space-y-4 max-w-7xl mx-12 m-auto h-full flex flex-col">
        <div className="grid grid-cols-3 my-2">
          <h1 className="col-span-1 col-start-2 text-4xl font-normal text-center">
            Your Images
          </h1>
          {enableDeletion && (
            <div className="flex justify-end mr-1 gap-4">
              {checkboxForm && (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`${
                          deleteLoading
                            ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 animate-pulse cursor-default"
                            : "bg-red-400 hover:bg-red-500 focus:ring-red-300"
                        } inline-flex items-center px-3 py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        {deleteLoading ? "Loading" : "Delete"}
                      </Popover.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                          {({ close }) => (
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative flex gap-12 bg-red-200 p-7">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSubmit(
                                      async data =>
                                        await postData(data, url, false)
                                    )()
                                    close()
                                  }}
                                  disabled={deleteLoading}
                                  className={`${
                                    deleteLoading
                                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-default"
                                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                  } inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 -m-3 transition duration-150 ease-in-out`}
                                >
                                  {deleteLoading
                                    ? "Loading"
                                    : "Delete Selected"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSubmit(
                                      async data =>
                                        await postData(data, url, true)
                                    )()
                                    close()
                                  }}
                                  disabled={deleteLoading}
                                  className={`${
                                    deleteLoading
                                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-default"
                                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                  } inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 -m-3 transition duration-150 ease-in-out`}
                                >
                                  {deleteLoading ? "Loading" : "Delete All"}
                                </button>
                              </div>
                            </div>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              )}
              <button
                type="button"
                onClick={e => {
                  e.preventDefault()
                  setCheckboxForm(!checkboxForm)
                  reset()
                }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {checkboxForm ? "Cancel" : "Select"}
              </button>
            </div>
          )}
        </div>
        {imagesOverview.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </form>
    )
  }

  // Render UserImages with the radioForm option
  if (radioForm) {
    return (
      <RadioGroup
        value={selected}
        onChange={e => {
          onChange(e)
          setSelected(e)
        }}
      >
        <h1 className="text-4xl font-normal text-center">Your Images</h1>
        {imagesOverview.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </RadioGroup>
    )
  }
}
