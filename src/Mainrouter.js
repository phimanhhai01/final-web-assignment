import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./core/Home";
import Signin from "./users/Signin";
import  PrivateRoute  from "./core/PrivateRoute";
import HomeRoute from "./core/HomeRoute";
const Mainrouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path="/signin" element={<HomeRoute><Signin /></HomeRoute>} />
            </Routes>
        </div>
    );
}

export default Mainrouter;