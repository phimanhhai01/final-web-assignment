import React from "react";
import { Routes, Route } from "react-router-dom"

//import Home from "./core/Home";
import Signin from "./users/Signin";
import  PrivateRoute  from "./core/PrivateRoute";
import HomeRoute from "./core/HomeRoute";
// import Menu from "./Menu";
// import Header from "../Header";
import ListCitizens from "./views/ListCitizens/ListCitizens";
import ListAgencies from "./views/ListAgencies/ListAgencies";
import Analysis from "./views/Analysis/Analysis";
import UpdateCitizensData from "./views/UpdateCitizensData/UpdateCitizensData";
import ManageFamily from "./views/ManageFamily/ManageFamily";

import Profile from "./views/ListCitizens/Profile";
import AgencySetting from "./views/agency/AgencySetting";
import Agencies from "./views/agency/Agencies";

const Mainrouter = () => {
    return (
        <div>
            {/* {location.pathname !== "/signin" && <Menu />}
            {location.pathname !== "/signin" && <Header />} */}
            <Routes>
                <Route exact path="signin" element={<HomeRoute><Signin /></HomeRoute>} />
                <Route exact path="" element={<PrivateRoute></PrivateRoute>} >
                    <Route exact path = "list-citizens/:id" element={<Profile />} />
                    <Route exact path="list-citizens" element={<ListCitizens />} />
                    <Route  path="management" element={<Agencies />}>
                        <Route exact path="" element={<ListAgencies />} />
                        <Route exact path=":id" element={<AgencySetting />} />
                    </Route>
                    
                    {/* <Route exact path="agency/add" element={<AddAgency />} /> */}
                    <Route exact path="analys-citizens" element={<Analysis />} />
                    <Route exact path="update-citizens-data" element={<UpdateCitizensData />} />
                    <Route exact path="family" element={<ManageFamily/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default Mainrouter;