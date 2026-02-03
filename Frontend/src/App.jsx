import React from "react";
import Navbar from "./components/Navbr";
import Home from "./Page/Home/Home";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Register from "./Page/Register/Register";
import EditRegistration from "./Page/Register/Components/EditRegistration";

const App = () => {
  return (
    <div>
       <Toaster position="bottom-right" />
      <Navbar />
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/editdetails" element={<EditRegistration/>}/>
        
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
