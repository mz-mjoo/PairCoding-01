import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
