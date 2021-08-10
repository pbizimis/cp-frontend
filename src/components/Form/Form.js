import React from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../../utils/use-api';
import { ToggleTextOrImage } from './ToggleSeedOrImage';
import { TextInput } from './TextInput';
import { DiscreteSlider } from './Slider';
import { Dropdown } from './Dropdown';

/**
 * The Form factory component.
 *
 * @export
 * @param {object} method
 * @param {function} setApiLoading
 * @param {function} setApiData
 * @param {function} getAccessTokenSilently
 * @return {HTML} 
 */
export function Form({
  method,
  setApiLoading,
  setApiData,
  getAccessTokenSilently,
}) {
  const { control, handleSubmit, setValue } = useForm();

  const { url } = method;

  const fetchData = async (data, event, url) => {
    event.preventDefault();
    setApiLoading(true);
    const state = await useApi(data, url, getAccessTokenSilently);
    setApiLoading(false);
    setApiData(state.data);
  };

  function buildForm() {
    const formOptions = method.method_options;
    const componentList = new Array(Object.keys(formOptions).length - 1).fill(0);

    for (const key in formOptions) {
      if (formOptions[key].type === 'dropdown') {
        const options = [];
        formOptions[key].options.map((model) => options.push(model));
        formOptions[key].options = options;

        componentList[formOptions[key].place - 1] = (
          <Dropdown data={formOptions[key]} control={control} />
        );
      } else if (formOptions[key].type === 'slider') {
        componentList[formOptions[key].place - 1] = (
          <DiscreteSlider data={formOptions[key]} control={control} />
        );
      } else if (formOptions[key].type === 'seed_or_image') {
        componentList[formOptions[key].place - 1] = (
          <ToggleTextOrImage
            data={formOptions[key]}
            control={control}
            reset={setValue}
          />
        );
      } else if (formOptions[key].type === 'text') {
        componentList[formOptions[key].place - 1] = (
          <TextInput data={formOptions[key]} control={control} />
        );
      }
    }
    return componentList;
  }

  return (
    <form
      className="space-y-4 max-w-7xl m-auto h-full flex flex-col overflow-hidden"
      onSubmit={handleSubmit(
        async (data, event) => await fetchData(data, event, url),
      )}
    >
      <div className="overflow-y-auto pr-2 pl-2 pb-6 border-gray-200 border-4 rounded-md">
        <div>
          <div className="mt-6 grid grid-cols-1 lg:gap-y-12 gap-y-6 gap-x-4 sm:grid-cols-6">
            {buildForm().map((component, index) => (
              <React.Fragment key={index}>{component}</React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl m-auto">
        <button
          type="submit"
          className="py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate
        </button>
      </div>
    </form>
  );
}
