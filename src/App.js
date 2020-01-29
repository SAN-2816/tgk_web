import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Routers from "./Components/Routers";

import "./App.css";

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routers />
      </Router>
    </CookiesProvider>
  );
}

export default App;
