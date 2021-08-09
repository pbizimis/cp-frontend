import React, { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"

export default function Flyout({ name, description}) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={
              "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }
          >
            <QuestionMarkCircleIcon className="h-5 w-5 text-indigo-600 opacity-80" aria-hidden="true" />
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
              className="absolute z-10 mt-3 transform w-screen max-w-lg"
            >
              <div className="rounded-lg shadow-2xl overflow-hidden">
                <div className="relative bg-gray-900 px-4 py-4">
                    <p className="text-base font-medium text-white">{name}</p>
                    <p className="mt-1 text-sm text-white">{description}</p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
