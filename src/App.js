import React from "react";
import { BrowserRouter } from "react-router-dom"
import Mainrouter from "./Mainrouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(46, 49, 146)",
    },
  },
});


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={outerTheme}>
        <Mainrouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
