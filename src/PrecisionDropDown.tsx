import React, { ChangeEventHandler } from 'react';

interface DropDownProps {
    onChange: ChangeEventHandler<HTMLSelectElement>,
    selectedOption: string
}

export default function PrecisionDropDown(props: DropDownProps) {
  return (
      <select value={props.selectedOption} onChange={props.onChange}>
        <option value="Seconds">Seconds</option>
        <option value="Deciseconds">Deciseconds</option>
        <option value="Centiseconds">Centiseconds</option>
      </select>
  );
}

 
