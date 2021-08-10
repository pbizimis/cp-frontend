import React, { useState } from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { BadgeCheckIcon } from '@heroicons/react/outline';
import { classNames } from '../../utils/class-names';
import { Method } from './Method';

/**
 * The Methods component that builds the individual methods and renders all of them.
 *
 * @export
 * @param {function} getAccessTokenSilently
 * @param {object} data
 * @param {string} url_prefix
 * @return {HTML} 
 */
export function Methods({ getAccessTokenSilently, data, url_prefix }) {
  const [selectedId, setSelectedId] = useState(null);

  const methods = [];

  // Build methods array if data is loaded
  if (data) {
    for (const method in data) {
      data[method].url = url_prefix + data[method].name.toLowerCase();
      methods.push(data[method]);
    }
  // Otherwise, show a loading circle
  } else {
    return (
      <div className="flex justify-center items-center mt-24">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex justify-center items-center text-gray-300">
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
    );
  }

  return (
    <AnimateSharedLayout>
      <div className="m-auto max-w-5xl">
        <div className="mx-6 sm:mx-10 rounded-lg bg-gray-200 shadow-2xl divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px relative">
          {methods.map((model, modelIdx) => (
            <motion.div
              key={model.name}
              layoutId={`container-${model.name}`}
              onClick={() => setSelectedId(model.name)}
              className={classNames(
                modelIdx === 0
                  ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                  : '',
                modelIdx === 1 ? 'sm:rounded-tr-lg' : '',
                modelIdx === methods.length - 2 ? 'sm:rounded-bl-lg' : '',
                modelIdx === methods.length - 1
                  ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                  : '',
                'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer',
              )}
            >
              <motion.div>
                <motion.span
                  layoutId={`title-icon-${model.name}`}
                  className="rounded-lg inline-flex p-3 ring-4 ring-white bg-purple-50 text-purple-700"
                >
                  <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
                </motion.span>
              </motion.div>
              <motion.div
                layout
                className="inline-flex flex-col items-start mt-6"
              >
                <motion.h3
                  className="text-2xl font-medium"
                  style={{ lineHeight: 1 }}
                  layoutId={`title-text-${model.name}`}
                >
                  {model.name}
                </motion.h3>
                <motion.p
                  animate={{
                    opacity: selectedId === model.name ? 0 : 1,
                    transition:
                    selectedId === model.name
                      ? { delay: 0 }
                      : { duration: 0.2, delay: 0.5 },
                  }}
                  className="mt-2 text-sm text-gray-500"
                >
                  {model.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
          <AnimatePresence>
            {selectedId && (
            <Method
              id={selectedId}
              onClick={() => setSelectedId(null)}
              getAccessTokenSilently={getAccessTokenSilently}
              methods={methods}
            />
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimateSharedLayout>
  );
}
