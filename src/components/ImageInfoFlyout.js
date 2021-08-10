import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/solid';

/**
 * A flyout component that shows information about an image.
 *
 * @export
 * @param {object} imageData
 * @return {HTML} 
 */
export default function ImageInfoFlyout({ imageData }) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="group absolute -ml-4 -mt-2 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <InformationCircleIcon
              className="h-10 w-10 text-indigo-600"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 mt-3 transform max-w-lg"
            >
              <div className="rounded-lg shadow-2xl overflow-hidden">
                <div className="relative bg-gray-900 px-4 py-4">
                  <p className="text-base font-medium text-white float-left mr-2">
                    Method:
                  </p>
                  <p className="text-base font-normal text-gray-400">
                    {imageData.method.name}
                  </p>
                  <p className="text-base font-medium text-white float-left mr-2">
                    Created:
                  </p>
                  <p className="text-base font-normal text-gray-400">
                    {imageData.creation_date.slice(8, 10)}.
                    {imageData.creation_date.slice(5, 7)}.
                    {imageData.creation_date.slice(0, 4)}
                  </p>
                  {(imageData.method.seed || imageData.method.seed === "") && (
                    <>
                      {imageData.method.seed === "" && (
                        <>
                          <p className="text-base font-medium text-white float-left mr-2">
                            Seed:
                          </p>
                          <p className="text-base font-normal text-gray-400">
                            random
                          </p>
                        </>
                      )}
                      {imageData.method.seed !== "" && (
                        <>
                          <p className="text-base font-medium text-white float-left mr-2">
                            Seed:
                          </p>
                          <p className="text-base font-normal text-gray-400">
                            {imageData.method.seed}
                          </p>
                        </>
                      )}
                    </>
                  )}
                  {imageData.method.name === "StyleMix" && (
                    <>
                      <p className="text-base font-medium text-white float-left mr-2">
                        Row Image:
                      </p>
                      <p className="text-base font-normal text-gray-400">
                        {imageData.method.row_image}
                      </p>

                      <p className="text-base font-medium text-white float-left mr-2">
                        Column Image:
                      </p>
                      <p className="text-base font-normal text-gray-400">
                        {imageData.method.column_image}
                      </p>
                    </>
                  )}
                  <p className="text-base font-medium text-white inline mr-2">
                    Model Version:
                  </p>
                  <p className="text-base font-normal text-gray-400 inline">
                    {imageData.method.model.version}
                  </p>

                  <p className="text-base font-medium text-white mt-2">
                    Model Stats:
                  </p>
                  <p className="mt-1 text-sm text-white ml-2">
                    Images {imageData.method.model.img}K
                  </p>
                  <p className="mt-1 text-sm text-white ml-2">
                    Resolution {imageData.method.model.res}px
                  </p>
                  <p className="mt-1 text-sm text-white ml-2">
                    FID {imageData.method.model.fid}
                  </p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
