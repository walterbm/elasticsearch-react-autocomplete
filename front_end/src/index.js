// Styling
require('./style.scss');

// JavaScript libraries
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';

// Inject base component in index.html
ReactDOM.render(<SearchBar url="http://127.0.0.1:9393/" />, document.getElementById('root'));
