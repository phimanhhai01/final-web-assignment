import React, { useState } from "react";
import { userLoginAsync } from "../redux/reducers/user/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import './Signin.css';
import logo_Boyte from './logo_Boyte.png';
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
             
        :   <div id="SignIn_Area">   
                <div id="SignIn">
                    <p id="Xinchao">Xin chào! 🇻🇳</p>
                    <form onSubmit={handleSubmit}>
                        {isLoading && <p>is loading</p>}
                        <div className="InputBlock">
                            <label>Tên đăng nhập</label>
                            <input type="text" name="username" value={username} onChange={handleChangeUsername} />
                        </div>
                        <div className="InputBlock">
                            <label>Mật khẩu</label>
                            <input type="password" name="password" value={password} onChange={handleChangePassword}/>
                        </div>
                        <div id="ButtonBlock">
                            <button id="submitButton" type='submit'>Đăng nhập</button>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                    </form>
                </div>
                <div id="Logo">
                    <img id="Logo_img" src={logo_Boyte} alt="logo_Boyte"></img>
                    <p id="AppName">HỆ THỐNG ĐIỀU TRA DÂN SỐ VIỆT NAM</p>
                </div>
            </div>}
        </div>
    );
}

export default Signin;