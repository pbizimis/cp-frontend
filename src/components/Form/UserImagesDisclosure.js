import React from 'react';
import { Disclosure } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/solid';
import { UserImages } from '../UserImages/UserImages';

/**
 * A disclosure component of the Form group. If button is pressed, a panel with user images is opened.
 *
 * @export
 * @param {string} currentImage
 * @param {function} onChange
 * @param {boolean} radioForm
 * @return {HTML} 
 */
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
            <Disclosure.Panel className="fixed inset-0 bg-indigo-800 bg-opacity-20 z-50 flex justify-center items-center">
              <div className="relative w-full max-w-6xl mx-2 md:mx-6 bg-white rounded-lg h-4/6 py-2">
                <Disclosure.Button className="absolute z-50 right-2 top-11 mx-4 p-1.5 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Close</span>
                </Disclosure.Button>
                <div className="overflow-y-auto px-6 sm:px-12 py-6 h-full">
                  <UserImages onChange={onChange} radioForm={radioForm} />
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
