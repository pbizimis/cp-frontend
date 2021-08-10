import React from 'react';
import Slider from '@material-ui/core/Slider';
import { Controller } from 'react-hook-form';
import Flyout from '../Flyout';

/**
 * A slider component of the Form group.
 *
 * @export
 * @param {object} data
 * @param {function} control
 * @return {HTML} 
 */
export function DiscreteSlider({ data, control }) {
  return (
    <div className="sm:col-span-6">
      <div className="flex gap-2 relative">
        <Flyout name={data.name} description={data.description} />
        <label className="block text-sm font-medium text-gray-700">
          {data.name}
        </label>
      </div>
      <div className="mx-4">
        <Controller
          control={control}
          name={data.name.toLowerCase()}
          defaultValue={data.default}
          render={({ field: { onChange } }) => (
            <Slider
              defaultValue={data.default}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={data.step}
              marks
              min={data.min}
              max={data.max}
              onChangeCommitted={(_, value) => onChange(value)}
            />
          )}
        />
      </div>
    </div>
  );
}
