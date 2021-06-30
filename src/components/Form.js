import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { DiscreteSlider } from "./Slider";
import { postApi } from "../utils/use-api";
import { useForm, Controller } from "react-hook-form";

const people = [
    { id: 1, name: '128x128' },
    { id: 2, name: '256x256' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export function Form({setApiLoading, setApiData, getAccessTokenSilently}) {
  const [selected, setSelected] = useState(people[0])
  const { control, handleSubmit } = useForm();

  const url = "https://testapi-service-mdvcgw37oq-ew.a.run.app/api/v1/post/protected";
  const options = {
    audience: process.env.GATSBY_AUDIENCE,
    scope: 'use:all',
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const fetchData = async (data, event, url, options) => {
    event.preventDefault();
    setApiLoading(true);
    const state = await postApi(data, url, options, getAccessTokenSilently);
    setApiLoading(false);
    setApiData(state.data);
  }

  return (
      <form className="space-y-8 divide-y divide-gray-200 max-w-7xl m-auto mt-24" onSubmit={handleSubmit(async (data, event) => await fetchData(data, event, url, options))}>
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
  
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <Controller
                    control={control}
                    name="model"
                    defaultValue={selected}
                    render={({ field: {onChange} })  => (
                <Listbox value={selected} onChange={(e) => {onChange(e); setSelected(e)}}>
                {({ open }) => (
                    <>
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                            {people.map((person) => (
                            <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                classNames(
                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                )
                                }
                                value={person}
                            >
                                {({ selected, active }) => (
                                <>
                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {person.name}
                                    </span>

                                    {selected ? (
                                    <span
                                        className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                        )}
                                    >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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

              <div className="sm:col-span-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Truncation
                </label>
                <div className="w-full">
                <Controller
                control={control}
                name="truncation"
                defaultValue={1}
                render={({ field: { onChange } })  => (
                  <DiscreteSlider defaultValue={1} min={-2} max={2} step={0.1} onChange={onChange} />
                )}
                />
                </div>
              </div>
  
            </div>
          </div>
        </div>

        <div className="pt-5 max-w-7xl m-auto">
            <div className="flex justify-end">
                <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Generate
                </button>
            </div>
        </div>
      </form>
  )
}