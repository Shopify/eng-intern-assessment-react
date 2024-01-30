import React from 'react'

export default function StopWatchButton({type, onClick, disable, isDark}: Readonly<StopWatchButtonProps>) {
    switch(type){
        case 'start':
            return <button title='Start' onClick={onClick} disabled={disable} className="border-[1.5px] text-[#418b45] border-[#418b45] bg-[#204220] border-opacity-60 bg-opacity-10  text-opacity-60 hover:text-opacity-100 rounded-full font-light w-[80px] h-[80px]">
                Start
            </button>
        case 'stop':
            return <button title='Stop' onClick={onClick} disabled={disable} className="border-[1.5px] text-[#B23D39] border-[#B23D39] bg-[#3A1612] border-opacity-60 bg-opacity-10  text-opacity-60 hover:text-opacity-100 rounded-full font-light w-[80px] h-[80px]">
                Stop
            </button>
        case 'reset':
            return <button title='Reset' onClick={onClick} disabled={disable} className={`border-[1.5px] ${isDark ? "border-white border-opacity-60 bg-white bg-opacity-10 text-white text-opacity-60 hover:text-opacity-100" : "border-[#202123] border-opacity-60 bg-[#202123] bg-opacity-10 text-[#202123] text-opacity-60 hover:text-opacity-100"} rounded-full font-light w-[80px] h-[80px]`}>
                Reset
            </button>
        case 'lap':
            return <button title='Lap' onClick={onClick} disabled={disable} className={`border-[1.5px] ${isDark ? "border-white border-opacity-60 bg-white bg-opacity-10 text-white text-opacity-60 hover:text-opacity-100" : "border-[#202123] border-opacity-60 bg-[#202123] bg-opacity-10 text-[#202123] text-opacity-60 hover:text-opacity-100"} rounded-full font-light w-[80px] h-[80px]`}>
                Lap
            </button>
    }
}

interface StopWatchButtonProps {
    type: "start" | "stop" | "reset" | "lap",
    onClick?: () => void,
    disable?: boolean,
    isDark? : boolean
}