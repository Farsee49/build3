import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
//import './style/index.css';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<BrowserRouter><App name="Build2"/></BrowserRouter>);