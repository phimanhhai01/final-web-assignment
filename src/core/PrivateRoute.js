import React from "react";
import { Navigate, Outlet  } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";

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