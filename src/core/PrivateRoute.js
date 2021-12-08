import React from "react";
import { Navigate, Routes, Route, Outlet  } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Home from "./Home";
import ListCitizens from "../views/ListCitizens/ListCitizens";
import ListUser from "../views/ListUser/ListUser";
import Analysis from "../views/Analysis/Analysis";
import UpdateCitizensData from "../views/UpdateCitizensData/UpdateCitizensData";
import ManageFamily from "../views/ManageFamily/ManageFamily";

import { isAuthenticated } from "../api/apiUser";
const style = {
    main: {
        marginLeft: "var(--sidebar-width)",
        padding: "0 0.5rem"
    }
}
const PrivateRoute = (props) => {
    
    const authed = isAuthenticated() // isauth() returns true or false based on localStorage
    return authed ?(
        <div>
            <Menu />
            <main style={style.main}>
                <Header />
                <div className="root-content">
                <Outlet />
                </div>
            </main>
        </div>
    ): <Navigate replace to="/signin" />;
}

export default PrivateRoute;