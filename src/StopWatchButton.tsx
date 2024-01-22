import React from 'react'

export default function StopWatchButton(
    { children, color, onClick }:
    { children: React.ReactNode, color: string, onClick: () => void }
) {
    const commonStyle = 'text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'
    const greenStyle = 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
    const redStyle = 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
    const grayStyle = 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
    const disabled = 'bg-gray-900 dark:bg-gray-800 opacity-60'
    const s = color === 'green' ? greenStyle :
                color === 'red' ? redStyle :
                color === 'gray' ? grayStyle :
                disabled
    return (
        <button type='button' disabled={color === 'disabled'} onClick={onClick} className={commonStyle + s}>
            {children}
        </button>
    )
}