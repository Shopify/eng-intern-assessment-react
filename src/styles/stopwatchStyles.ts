const stopwatchStyles = {
  container: {
    minHeight: "80vh",
    maxWidth: "500px",
    margin: "0 auto",
  },
  heading: {
    margin: "30px 0",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
  },
  stopwatchPaper: (theme: any) => ({
    padding: "30px 20px",
    backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#151D1E",
    borderRadius: "10px",
    width: "60%", 
    height: "70vh",
    boxSizing: "border-box",
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "20px auto",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  }),
  timeDisplay: {
    fontSize: {
        xs: "4rem", 
        sm: "4.5rem", 
        md: "5.5rem", 
        lg: "6.5rem", 
        xl: "7.5rem"
    },
    textAlign: "center",
    fontFamily: 'DigitalClockFont, sans-serif',
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lapList: (theme: any) => ({
    height: "200px",
    overflowY: "auto",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: "10px",
    borderTop: theme.palette.mode === "light" ? "2px solid #308023" : "2px solid #53D93D",
    width: "35%",
    [theme.breakpoints.down("md")]: {
      width: "55%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  }),
};

export default stopwatchStyles;
