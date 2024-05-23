import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
//import './style/index.css';
// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);

// root.render(<App name="Build2"/>);




import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
    <App name="Build@2" />
    </BrowserRouter>
  
);

// let i = 0;
// setInterval(() => {
//   root.render(<App counter={i} />);
//   i++;
// }, 1000);