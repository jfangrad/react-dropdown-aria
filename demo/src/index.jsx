import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Basic from './Components/Basic';
import './index.scss';
import '../../src/styles/Dropdown.scss';

const Demo = () => (
  <div className="demo-app">
    <Header />
    <Basic />
  </div>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<Demo />, document.getElementById('root'));
