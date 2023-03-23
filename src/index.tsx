import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/system";
import { muiTheme } from "themes";
import { Layout, App } from "components";
import { DataProvider } from "contexts";

import "assets/index.css";

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element!);

const Root = () => {
  return (
    <StrictMode>
      <DataProvider>
        <ThemeProvider theme={muiTheme}>
          <Layout>
            <App />
          </Layout>
        </ThemeProvider>
      </DataProvider>
    </StrictMode>
  );
};

root.render(<Root />);
