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
    padding: "20px",
    backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#424242",
    borderRadius: "10px",
    width: "60%", 
    height: "70vh",
    boxSizing: "border-box",
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
  }),
  timeDisplay: {
    fontSize: "48px",
    fontWeight: "bold",
    textAlign: "center",
  },
  lapList: {
    height: "200px",
    overflowY: "auto",
    justifyContent: "center",
  },
};

export default stopwatchStyles;
