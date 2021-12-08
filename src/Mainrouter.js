import React from "react";
import { Routes, Route } from "react-router-dom"

import Home from "./core/Home";
import Signin from "./users/Signin";
import  PrivateRoute  from "./core/PrivateRoute";
import HomeRoute from "./core/HomeRoute";
// import Menu from "./Menu";
// import Header from "../Header";
import ListCitizens from "./views/ListCitizens/ListCitizens";
import ListUser from "./views/ListUser/ListUser";
import Analysis from "./views/Analysis/Analysis";
import UpdateCitizensData from "./views/UpdateCitizensData/UpdateCitizensData";
import ManageFamily from "./views/ManageFamily/ManageFamily";
import { useLocation } from "react-router";

const Mainrouter = () => {
    const location = useLocation();
    return (
        <div>
            {/* {location.pathname !== "/signin" && <Menu />}
            {location.pathname !== "/signin" && <Header />} */}
            <Routes>
                <Route exact path="/signin" element={<HomeRoute><Signin /></HomeRoute>} />
                <Route  path="/" element={<PrivateRoute></PrivateRoute>} >
                    <Route exact path="list-citizens" element={<ListCitizens />} />
                    <Route exact path="management" element={<ListUser />} />
                    <Route exact path="analys-citizens" element={<Analysis />} />
                    <Route exact path="update-citizens-data" element={<UpdateCitizensData />} />
                    <Route exact path="family" element={<ManageFamily/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default Mainrouter;