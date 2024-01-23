import { createContext,useMemo } from 'react';
import { StopWatchController } from './types';

export const StopWatchContext = createContext<{darkTheme:boolean,sw:StopWatchController}>(null);



export function useNuMorphicTheme(style:React.CSSProperties, darkTheme:boolean) {

    const containerStyle = useMemo(() => {
        const defaultContainer: React.CSSProperties = {
            backgroundColor: darkTheme ? "rgb(28,28,28,1)" : "rgb(230,230,230,1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width:"fit-content",
            margin:"auto",
            padding:"2rem",
            borderRadius:"1rem",
        }
        return Object.assign({}, defaultContainer, style) as React.CSSProperties;
    }, [darkTheme, style]);

    return containerStyle as React.CSSProperties;
}