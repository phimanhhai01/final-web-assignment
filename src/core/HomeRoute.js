import React from 'react';

import { Navigate } from 'react-router';
import { isAuthenticated } from '../api/apiUser';

const HomeRoute = ({children}) => {
    const authed = isAuthenticated();
    console.log(authed);

    return authed ? <Navigate replace to="/" /> : children;
}

export default HomeRoute;