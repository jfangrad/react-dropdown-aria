import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Basic from './Components/Basic';
import CustomRender from './Components/CustomRender';
import CustomArrow from './Components/CustomArrow';
import CustomStyles from './Components/CustomStyles';
import Groups from './Components/Groups';
import Footer from './Components/Footer';
import './index.scss';

const Demo = () => (
  <div className="demo-app">
    <Header />
    <div className="demo-container">
      <Basic />
      <Groups />
      <CustomStyles />
      <CustomRender />
      <CustomArrow />
    </div>
    <Footer />
  </div>
);

const DemoHot = hot(Demo);

// eslint-disable-next-line no-undef
ReactDOM.render(<DemoHot />, document.getElementById('root'));
