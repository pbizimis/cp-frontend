import React, { useEffect, useState } from 'react';

export function ImageContainer({
  image,
  register,
  urlPrefix,
  checkboxForm,
  deleteLoading,
}) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [checkboxForm]);

  const imageContainerOnClick = () => {
    if (checkboxForm && !deleteLoading) {
      setSelected(!selected);
    }
  };

  return (
    <li key={image.url} className="col-span-1 bg-white">
      <input
        type="checkbox"
        className="hidden"
        id={image.url}
        value={image.url}
        disabled={!checkboxForm}
        {...register('id_list', {})}
      />
      <label htmlFor={image.url} onClick={imageContainerOnClick}>
        <img
          alt=""
          className={`${
            selected ? 'bg-blue-200' : 'bg-white'
          } p-2 shadow-lg m-auto w-full`}
          src={urlPrefix + image.url}
        />
      </label>
    </li>
  );
}
