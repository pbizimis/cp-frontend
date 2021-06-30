import React from 'react';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
  return `${value}°C`;
}

export function DiscreteSlider({ defaultValue, min, max, step, onChange }) {
  return (
    <Slider
    defaultValue={defaultValue}
    getAriaValueText={valuetext}
    aria-labelledby="discrete-slider"
    valueLabelDisplay="auto"
    step={step}
    marks
    min={min}
    max={max}
    onChangeCommitted={(_, value) => onChange(value)}
    />
  );
}