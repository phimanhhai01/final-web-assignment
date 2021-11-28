import React, { useState } from "react";
import { userLoginAsync } from "../redux/reducers/user/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
// import { Redirect } from "react-router-dom";
//import { useHistory } from "react-router-dom";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [redirectToHomePage, setRedirectToHomePage] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, currentUser, errorMessage } = useSelector(state => state.user);

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(userLoginAsync({username, password}));
    }
    return (
        <div>
            {currentUser
             ? <Navigate replace to="/" />
             
        :   <form onSubmit={handleSubmit}>
            {isLoading && <p>is loading</p>}
                <label>Username</label>
                <input type="text" name="username" value={username} onChange={handleChangeUsername} />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handleChangePassword}/>
                <input type='submit'/>
                {errorMessage && <p>{errorMessage}</p>}
            </form>}
        </div>
    );
}

export default Signin;