import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import 'core-js/features/url';
// import 'core-js/features/url-search-params';

import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('app'));
