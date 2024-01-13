import { useCallback, Dispatch, SetStateAction } from 'react';
import { StopWatchAction, StopWatchState } from '../resources/stopWatch';
import { Lap } from '../types';

// Moves stopwatch handle action logic here to make StopWatchComponent more easily readable

export function useHandleStopWatchAction(
  setState: Dispatch<SetStateAction<StopWatchState>>,
  setLapNumber: Dispatch<SetStateAction<number>>,
  setPrevTime: Dispatch<SetStateAction<number>>,
  setLaps: Dispatch<SetStateAction<Lap[]>>
) {
  const handleAction = useCallback(
    (event: StopWatchAction) => {
      switch (event) {
        case StopWatchAction.START:
        case StopWatchAction.RESUME: {
          setState(StopWatchState.RUNNING);
          break;
        }
        case StopWatchAction.STOP: {
          setState(StopWatchState.PAUSED);
          break;
        }
        case StopWatchAction.LAP: {
          setLapNumber((prevLapNumber: number) => prevLapNumber + 1);
          break;
        }
        case StopWatchAction.RESET: {
          setState(StopWatchState.INITIAL);
          setLapNumber(0);
          setPrevTime(0);
          setLaps([]);
          break;
        }
      }
    },
    [setState, setLapNumber, setPrevTime, setLaps]
  );
  return { handleAction: handleAction };
}
