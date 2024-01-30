import React, {useMemo} from "react";
import {getFormattedTime, getMilliseconds} from "./timelib";
import {ILap} from "./StopwatchType";

interface ILapsProps{
    laps: ILap[]
}
export function Laps(props: ILapsProps) {
    const { laps } = props;
    const reversedLaps = useMemo(()=>laps.slice().reverse(),[laps]);

    return (
        <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lap Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Split
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Time
                </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {reversedLaps.map((lap, i,lapArr) => (
                <tr key={`lap-${i}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Lap {lapArr.length - i}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getFormattedTime(lap.splitTime, true)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getFormattedTime(lap.lapTime, true)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}