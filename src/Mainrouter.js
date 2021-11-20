import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./core/Home";
import Signin from "./users/Signin";
import Signup from "./users/Signup";
import Menu from "./core/Menu";

const Mainrouter = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default Mainrouter;