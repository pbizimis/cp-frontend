import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import Flyout from '../Flyout';

/**
 * A text input component of the Form group.
 *
 * @export
 * @param {object} data
 * @param {function} control
 * @return {HTML} 
 */
export function TextInput({ data, control }) {
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
        defaultValue={data.default}
        render={({ field: { onChange } }) => (
          <>
            <TextField
              defaultValue={data.default}
              id="outlined-basic"
              onChange={onChange}
            />
          </>
        )}
      />
    </div>
  );
}
