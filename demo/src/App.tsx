import React from 'react';
import { BackTop } from 'antd';
import Header from './Components/Header';
import Basic from './Components/Basic';
import CustomRender from './Components/CustomRender';
import CustomArrow from './Components/CustomArrow';
import CustomStyles from './Components/CustomStyles';
import Groups from './Components/Groups';
import Footer from './Components/Footer';

import 'antd/dist/antd.css';
import './App.scss';

function App() {
  return (
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
      <BackTop />
    </div>
  );
}

export default App;
