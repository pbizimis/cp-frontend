import React from 'react';
import { Disclosure } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { ModelOverview } from './ModelOverview';

export function VersionOverview({
  versionName,
  versionData,
  urlPrefix,
  register,
  radioForm,
  checkboxForm,
  deleteLoading,
}) {
  const modelOverviews = [];

  for (const model in versionData) {
    modelOverviews.push(
      <ModelOverview
        modelName={model}
        modelData={versionData[model]}
        urlPrefix={urlPrefix}
        register={register}
        radioForm={radioForm}
        checkboxForm={checkboxForm}
        deleteLoading={deleteLoading}
      />,
    );
  }

  return (
    <div className="mb-12">
      <h1 className="md:text-2xl text-xl font-medium float-left mt-1 md:mt-0">{versionName}</h1>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button data-testid="version-button" className="mx-4 mt-1 p-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <PlusIcon
                className={`${
                  open ? 'transform rotate-45' : ''
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
            <Disclosure.Panel>
              <motion.div
                className="overflow-hidden"
                animate={{ height: 'auto' }}
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
  );
}
