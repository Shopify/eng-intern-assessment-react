import { StopWatchController, UseStopWatchProps } from ".";
import { AnalogDisplayProps } from ".";
import { StopWatchButtonGroupProps } from "./StopWatchButton";
import { LapDisplayProps } from "./LapDisplay";
import { StopWatchButtonProps } from "./StopWatchButton";
export interface Resolution {
    divisor: number;
    modulus: number;
}
export interface SwActions {
    start: () => void;
    stop: () => void;
    reset: () => void;
    lap: () => void;
}

export interface StopWatchUIElement {
    darkTheme?: boolean;
    borderColor?: string;
    height?: string;
    width?: string;
    borderRadius?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    color?: string;
    margin?: string;
    padding?: string;
    styles?: React.CSSProperties;
    testId?: string;
    containerStyles?: React.CSSProperties;
}

export interface AnalogProps {
    complication?: boolean;
    secondTicks?: boolean;
    clockSize?: number;
    handColor?: string;
    milliseconds?: number;
    laps?: number[];
    centerIconStyles?: React.CSSProperties;
}
export interface StopWatchLogicComponent{
    laps?: number[];
    milliseconds?: number;
    resolutions?: Resolution[];
    running?: boolean;
    actions?: SwActions;

}
export type stopWatch = StopWatchController


export {StopWatchController, UseStopWatchProps, AnalogDisplayProps, StopWatchButtonGroupProps, LapDisplayProps, StopWatchButtonProps}