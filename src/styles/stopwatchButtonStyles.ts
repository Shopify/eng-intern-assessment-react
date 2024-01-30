const stopwatchButtonStyles = {
    startStopButtonStyle: (theme: any) => ({ 
        width: {
            xs: '40px',
            sm: '50px', 
            md: '50px', 
            lg: '60px', 
            xl: '70px' 
        },
        height: {
            xs: '40px', 
            sm: '50px', 
            md: '50px', 
            lg: '60px', 
            xl: '70px'
        },
        margin: '3%',
        color: '#fff',
        backgroundColor: theme.palette.mode === "light" ? "#3CAC2A" : "#4DC839", 
        "&:hover": {
            backgroundColor: theme.palette.mode === "light" ? "#3CAC2A" : "#4DC839",
        },
    }),
    resetLapButtonStyle: {
        width: {
            xs: '40px', 
            sm: '50px',
            md: '50px', 
            lg: '60px', 
            xl: '70px' 
        },
        height: {
            xs: '40px', 
            sm: '50px', 
            md: '50px', 
            lg: '60px', 
            xl: '70px'
        },
        margin: '3%', 
        color: "#fff",
        backgroundColor: "#6F6F6F",
        "&:hover": {
            backgroundColor: "#6F6F6F",
        },
        "&:disabled": {
            backgroundColor: "#6F6F6F",
        },
    },
};

export default stopwatchButtonStyles;