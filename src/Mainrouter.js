import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./core/Home";
import Signin from "./users/Signin";
import  PrivateRoute  from "./core/PrivateRoute";
import HomeRoute from "./core/HomeRoute";
import Table from "./components/Table/Table";
import Menu from "./core/Menu";
const Mainrouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Menu><PrivateRoute><Home /></PrivateRoute></Menu>} />
                <Route exact path="/signin" element={<HomeRoute><Signin /></HomeRoute>} />
                <Route exact path="/list-citizens" element={<Menu><PrivateRoute><Table /></PrivateRoute></Menu>} />
            </Routes>
        </div>
    );
}

export default Mainrouter;