import { SxProps, Theme } from "@mui/material";

// define types for better type checking
interface AppStyles {
    logo: SxProps<Theme>;
    headerContainer: SxProps<Theme>;
}

const appStyles: AppStyles = {
    logo: {
      width: "100px",
      objectFit: "contain",
      margin: "5px 10px"
    },
    headerContainer: {
      padding: "10px",
    }
};

export default appStyles;