import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Basic from './Components/Basic';
import CustomRender from './Components/CustomRender';
import CustomArrow from './Components/CustomArrow';
import CustomStyles from './Components/CustomStyles';
import Footer from './Components/Footer';
import './index.scss';
import '../../src/styles/Dropdown.scss';

const Demo = () => (
  <div className="demo-app">
    <Header />
    <div className="demo-container">
      <Basic />
      <CustomStyles />
      <CustomRender />
      <CustomArrow />
    </div>
    <Footer />
  </div>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<Demo />, document.getElementById('root'));
