import React, { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { postApi } from "../utils/use-api"
import { Disclosure } from "@headlessui/react"
import { PlusIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"
import { RadioGroup } from "@headlessui/react"

function sortImages(images) {
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
  })
  return sortedImages
}

function ModelOverview({
  modelName,
  modelData,
  urlPrefix,
  onChange,
  radioForm,
}) {
  const [selected, setSelected] = useState(null)
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
              {radioForm && (
                <RadioGroup
                  value={selected}
                  onChange={e => {
                    onChange(e)
                    setSelected(e)
                  }}
                >
                  <motion.ul
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="grid grid-cols-1 lg:gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden"
                  >
                    {modelData.map(image => (
                      <RadioGroup.Option key={image.url} value={image.url}>
                        {({ checked }) => (
                          <li key={image.url} className="col-span-1 bg-white">
                            <img
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
                    ))}
                  </motion.ul>
                </RadioGroup>
              )}
              {!radioForm && (
                <motion.ul
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="grid grid-cols-1 lg:gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden"
                >
                  {modelData.map(image => (
                    <li key={image.url} className="col-span-1 bg-white">
                      <img
                        className="p-2 shadow-lg m-auto"
                        src={urlPrefix + image.url}
                      ></img>
                    </li>
                  ))}
                </motion.ul>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

function VersionOverview({
  versionName,
  versionData,
  urlPrefix,
  onChange,
  radioForm,
}) {
  let modelOverviews = []

  for (let model in versionData) {
    modelOverviews.push(
      <ModelOverview
        modelName={model}
        modelData={versionData[model]}
        urlPrefix={urlPrefix}
        onChange={onChange}
        radioForm={radioForm}
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
                {modelOverviews}
              </motion.div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export const UserImages = ({ onChange, radioForm }) => {
  const [data, setData] = useState(false)
  const [urlPrefix, setUrlPrefix] = useState(null)
  const { getAccessTokenSilently } = useAuth0()

  const url = "http://localhost:8000/api/v1/user/images"

  const fetchData = async () => {
    const state = await postApi(null, url, getAccessTokenSilently)
    setData(sortImages(state.data))
    setUrlPrefix(state.data.image_url_prefix)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return (
      <div className="bg-white flex justify-center items-center h-full">
        <div class="flex items-center justify-center w-full h-full">
          <div class="flex justify-center items-center text-gray-500">
            <svg
              fill="none"
              class="w-24 h-24 animate-spin"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  let imagesOverview = []

  for (let version in data) {
    imagesOverview.push(
      <VersionOverview
        versionName={version}
        versionData={data[version]}
        urlPrefix={urlPrefix}
        onChange={onChange}
        radioForm={radioForm}
      />
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-normal text-center">Your Images</h1>
      {imagesOverview}
    </div>
  )
}
