import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {green} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";
import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

const theme = createTheme({
    palette: {
        primary: green,
        mode: 'dark'
    }
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Provider store={store}>
                <AppWithRedux/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();