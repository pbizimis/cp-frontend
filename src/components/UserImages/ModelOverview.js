import React from 'react';
import { Disclosure, RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { ImageContainer } from './ImageContainer';

/**
 * The model overview component of the UserImages group.
 *
 * @export
 * @param {string} modelName
 * @param {object} modelData
 * @param {string} urlPrefix
 * @param {function} register
 * @param {boolean} radioForm
 * @param {boolean} checkboxForm
 * @param {boolean} deleteLoading
 * @return {HTML} 
 */
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
      <h1 className="md:text-2xl text-xl font-normal mb-4 text-black sm:float-left">
        Model:
        {' '}
        {modelName}
      </h1>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button data-testid="model-button" className="sm:mx-4 sm:p-1 py-1 w-full sm:w-auto text-sm font-medium text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <PlusIcon
                className={`${
                  open ? 'transform rotate-45' : ''
                } w-5 h-5 text-purple-500 m-auto`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 mt-6">
              <motion.ul
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="grid grid-cols-1 md:gap-x-20 md:gap-y-20 sm:gap-x-14 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden w-full max-w-6xl m-auto"
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
                                    ? 'p-2 shadow-lg m-auto bg-green-400'
                                    : 'p-2 shadow-lg m-auto bg-white'
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
  );
}
