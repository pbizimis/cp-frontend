import React from "react"
import { Fragment } from "react"
import { Transition, Menu } from "@headlessui/react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import { DotsVerticalIcon } from "@heroicons/react/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function DotMenu({ logout, name }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-900 rounded-full flex items-center text-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              <span className="sr-only">Open options</span>
              <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute z-50 right-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <h1
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full"
                      )}
                    >
                      Hi, {name}
                    </h1>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer w-full text-left"
                      )}
                      id="logout"
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export function Nav() {
  const { isAuthenticated, user, logout } = useAuth0()

  return (
    <div className="relative z-50 bg-gray-900 py-3">
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
        <Link
          to="/console"
          className="inline-flex items-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
        >
          Console
        </Link>
        {isAuthenticated && (
          <div className="flex items-center ml-6">
            <DotMenu logout={logout} name={user.name} />
          </div>
        )}
      </nav>
    </div>
  )
}
