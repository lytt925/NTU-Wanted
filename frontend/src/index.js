import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { FilterProvider } from "./containers/hooks/useFilter"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CssBaseline />
        <FilterProvider>
            <App />
        </FilterProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
