import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Routers from "./Components/Routers";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import "./App.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5eb3ff",
      main: "#36A0FF",
      dark: "#2570b2",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff8c68",
      main: "#FF7043",
      dark: "#b24e2e",
      contrastText: "#fff"
    }
  },
  status: {
    danger: "#f50057"
  }
});

function App() {
  return (
    <CookiesProvider>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Routers />
        </MuiThemeProvider>
      </Router>
    </CookiesProvider>
    // <CookiesProvider>
    //   <Router>
    //     <Routers />
    //   </Router>
    // </CookiesProvider>
  );
}

export default App;
