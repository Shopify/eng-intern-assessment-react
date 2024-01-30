import React from 'react';

type Props = {
  label: string;
  handleClick: () => void;
};

export default function StopWatchButton({ label, handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className='btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
      {label}
    </button>
  );
}
