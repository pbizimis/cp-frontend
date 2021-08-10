import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Controller } from 'react-hook-form';
import Flyout from '../Flyout';
import { classNames } from '../../utils/class-names';

/**
 * A dropdown component of the Form group.
 *
 * @export
 * @param {object} data
 * @param {function} control
 * @return {HTML} 
 */
export function Dropdown({ data, control }) {
  const [selected, setSelected] = useState(data.options[data.default]);
  return (
    <div className="sm:col-span-6">
      <div className="flex gap-2 relative">
        <Flyout name={data.name} description={data.description} />
        <label className="block text-sm font-medium text-gray-700">
          {data.name}
        </label>
      </div>
      <Controller
        control={control}
        name={data.name.toLowerCase()}
        defaultValue={selected}
        render={({ field: { onChange } }) => (
          <Listbox
            value={selected}
            onChange={(e) => {
              onChange(e);
              setSelected(e);
            }}
          >
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {data.name.toLowerCase() === 'model' && (
                    <span className="block truncate">Model ({selected.img}k images, Resolution {selected.res}, FID {selected.fid})</span>
                    )}
                    {data.name.toLowerCase() !== 'model' && (
                    <span className="block truncate">{selected}</span>
                    )}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {data.options.map((option) => (
                        <Listbox.Option
                          key={option.img + option.res + option.fid}
                          className={({ active }) => classNames(
                            active
                              ? 'text-white bg-indigo-600'
                              : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-8 pr-4',
                          )}
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              {data.name.toLowerCase() === 'model' && (
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate',
                                )}
                              >Model ({option.img}k images, Resolution {option.res}, FID {option.fid})</span>
                              )}
                              {data.name.toLowerCase() !== 'model' && (
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate',
                                )}
                              >
                                {option}
                              </span>
                              )}

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )}
      />
    </div>
  );
}
