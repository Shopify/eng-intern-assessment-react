import React, { ChangeEventHandler } from 'react';

interface DropDownProps {
    onChange: ChangeEventHandler<HTMLSelectElement>,
    selectedOption: string
}

export default function PrecisionDropDown(props: DropDownProps) {
  return (
      <select data-testid="dropdown" value={props.selectedOption} onChange={props.onChange}>
        <option data-testid="seconds" value="Seconds">Seconds</option>
        <option data-testid="deciseconds" value="Deciseconds">Deciseconds</option>
        <option data-testid="centiseconds" value="Centiseconds">Centiseconds</option>
      </select>
  );
}

 
