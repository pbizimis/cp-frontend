import React, { Fragment } from 'react';

import { Transition, Menu } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'gatsby';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { classNames } from '../utils/class-names';

/**
 * A dot menu that renders the name of the user and a logout button.
 *
 * @export
 * @param {function} logout
 * @param {string} name
 * @return {*} 
 */
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
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full',
                      )}
                    >
                      Hi,
                      {' '}
                      {name}
                    </h1>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm cursor-pointer w-full text-left',
                      )}
                      id="logout"
                      onClick={() => logout({ returnTo: window.location.origin })}
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
  );
}

export function Nav() {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <div className="relative z-50 bg-gray-900 py-3">
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between px-6"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
              </svg>
            </Link>
          </div>
        </div>
        <Link
          to="/console"
          className="inline-flex items-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
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
  );
}
