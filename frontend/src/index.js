import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { FilterProvider } from "./containers/hooks/useFilter"
import { UserProvider } from './containers/hooks/useUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CssBaseline />
        <UserProvider>
            <FilterProvider>
                <App />
            </FilterProvider>
        </UserProvider>
    </React.StrictMode>
);

reportWebVitals();
