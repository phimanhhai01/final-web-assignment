import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./core/Home";
import Signin from "./users/Signin";
import  PrivateRoute  from "./core/PrivateRoute";
import HomeRoute from "./core/HomeRoute";
import ListCitizens from "./views/ListCitizens/ListCitizens";
import ListUser from "./views/ListUser/ListUser";
import Analysis from "./views/Analysis/Analysis";
import UpdateCitizensData from "./views/UpdateCitizensData/UpdateCitizensData";
import { useLocation } from "react-router";
import Menu from "./core/Menu";
import Header from "./core/Header";
import ManageFamily from "./views/ManageFamily/ManageFamily";
const Mainrouter = () => {
    const location = useLocation();
    return (
        <div>
            {location.pathname !== "/signin" && <Menu />}
            {location.pathname !== "/signin" && <Header />}
            <Routes>
                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path="/signin" element={<HomeRoute><Signin /></HomeRoute>} />
                <Route exact path="/list-citizens" element={<PrivateRoute><ListCitizens /></PrivateRoute>} />
                <Route exact path="/management" element={<PrivateRoute><ListUser /></PrivateRoute>} />
                <Route exact path="/analys-citizens" element={<PrivateRoute><Analysis /></PrivateRoute>} />
                <Route exact path="/update-citizens-data" element={<PrivateRoute><UpdateCitizensData /></PrivateRoute>} />
                <Route exact path="/family" element={<PrivateRoute><ManageFamily/></PrivateRoute>} />
            </Routes>
        </div>
    );
}

export default Mainrouter;