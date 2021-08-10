import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import Flyout from '../Flyout';
import { classNames } from '../../utils/class-names';
import { UserImagesDisclosure } from './UserImagesDisclosure';

/**
 * A toggle component of the Form group. Toggles between a text input and an image selection.
 *
 * @export
 * @param {object} data
 * @param {function} control
 * @param {function} reset
 * @return {HTML} 
 */
export function ToggleTextOrImage({ data, control, reset }) {
  const [enabled, setEnabled] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  return (
    <div className="sm:col-span-6">
      <div className="flex gap-2 relative">
        <Flyout name={data.name.replace('_', ' ')} description={data.description} />
        <label className="block text-sm font-medium text-gray-700">
          {data.name.replace('_', ' ')}
        </label>
      </div>
      <div className="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          onClick={(e) => {
            e.preventDefault();
            setEnabled(true);
            setCurrentImage('');
            if (!enabled) {
              reset(data.name.toLowerCase(), '');
            }
          }}
          className={classNames(
            enabled
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer focus:outline-none',
          )}
        >
          Seed
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setEnabled(false);
            if (enabled) {
              setCurrentImage('');
              reset(data.name.toLowerCase(), '');
            }
          }}
          className={classNames(
            !enabled
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer focus:outline-none',
          )}
        >
          Image
        </button>
      </div>
      <div className="sm:col-span-6">
        <Controller
          control={control}
          name={data.name.toLowerCase()}
          render={({ field: { onChange } }) => (
            <>
              {enabled && (
              <TextField
                defaultValue={data.default}
                id="outlined-basic"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              )}
              {!enabled && (
              <div className="flex">
                <UserImagesDisclosure
                  currentImage={currentImage}
                  onChange={(e) => {
                    onChange(e);
                    setCurrentImage(e);
                  }}
                  radioForm
                />
              </div>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}
