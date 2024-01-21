import { createContext } from 'react';
import { StopWatchController } from './types';

export const StopWatchContext = createContext<{darkTheme:boolean,sw:StopWatchController}>(null);