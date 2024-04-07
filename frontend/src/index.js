// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext'; // Import the provider

ReactDOM.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap your app in the provider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
