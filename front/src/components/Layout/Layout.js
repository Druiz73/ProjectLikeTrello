import React from "react";
import { Helmet } from "react-helmet-async";
import './Layout.css'
//Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Project Stars</title>
      </Helmet>
      <Header />  
        <div className="content">
          {children}
        </div>
      <Footer />
    </>
  );
};

export default Layout;
