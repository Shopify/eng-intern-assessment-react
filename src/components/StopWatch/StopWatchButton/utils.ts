import { useMemo } from "react";


export const baseUnstyled: React.CSSProperties = {
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    textAlign: 'center',
    display: 'inline-block',
    height: '4rem',
    width: '4rem',
    cursor: 'pointer', 
    alignItems: 'center',
}



export const useButtonTheme = (darkTheme: boolean) => {
    return useMemo(() => {

        const baseNuMorphic: React.CSSProperties = {
            ...baseUnstyled,
            alignItems: 'center',
            background: darkTheme ? '#2B2B2B' :  "#f5f5fa", 
            boxShadow: darkTheme ? '-4px -4px 10px rgba(67, 67, 67, 0.5), inset 4px 4px 10px rgba(0, 0, 0, 0.5), inset -4px -4px 10px rgba(67, 67, 67, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.3)' : '-10px -10px 30px 0 #fff,10px 10px 30px 0 #1d0dca17',
            boxSizing: 'border-box',
            color: darkTheme? '#c0c0c0' : '#2B2B2B',
            display: 'flex',
            fontSize: '1rem',
            justifyContent: 'center',
            lineHeight: '1.5rem',
            position: 'relative',
            textAlign: 'left',
            whiteSpace: 'pre',
            wordBreak: 'normal',
            wordSpacing: 'normal',
        };
        return {baseNuMorphic}
    }, [darkTheme]);
}

export const baseLightModeNumorphic: React.CSSProperties = {
    ...baseUnstyled,
    alignItems: 'center',
    border: '0',
    borderRadius: '50% ',
    background: "#f5f5fa", 
    boxShadow:  '-10px -10px 30px 0 #fff,10px 10px 30px 0 #1d0dca17',
    boxSizing: 'border-box',
    color: '#2B2B2B',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1rem',
    justifyContent: 'center',
    lineHeight: '1.5rem',
    width: '4rem',
    height: '4rem',
    position: 'relative',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordBreak: 'normal',
    wordSpacing: 'normal',
}

export const baseContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px',
    gap: '16px',
    width: '100%',
}