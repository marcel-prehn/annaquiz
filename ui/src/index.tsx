import { Grommet } from "grommet";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AnnaquizTheme } from "./components/AnnaquizTheme";

ReactDOM.render(
  <HashRouter>
    <Grommet theme={AnnaquizTheme}>
      <App />
    </Grommet>
  </HashRouter>,
  document.getElementById("root")
);
