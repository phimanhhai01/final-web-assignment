import React, { useState } from "react";
// import { userLoginAsync } from "../redux/reducers/user/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import logo_Boyte from './logo_Boyte.png';
import Background from './connectivity.jpeg';
import {TextField} from "@mui/material";
// import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
// import { Redirect } from "react-router-dom";
//import { useHistory } from "react-router-dom";
// import Radium from 'radium';
import { loginApi } from "../api/apiUser";
import userActions from "../redux/reducers/user/user.actions"
import {addToast} from "../utils"

import "./signin.css"
const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    //const [redirectToHomePage, setRedirectToHomePage] = useState(false);
    const dispatch = useDispatch();
    const currentUser_id = useSelector(state => state.user.currentUser.id);

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = validate()
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            (async () => {
                setLoading(true)
                try {
                    let res = await loginApi({password: password, username: username})
                    console.log(res)
                    if (res.status === 200) {
                        localStorage.setItem("token", res.data.jwt)
                        dispatch(userActions.userLoginSuccess(res.data.user_logedin))
                    } else if (res.status === 400) {
                        setErrors(res.data)
                    }
                    setLoading(false)
                } catch (error) {
                    addToast({type:'error', title:'Lỗi!', message:'Đã có xự cố ngoài ý muốn xảy ra', duration: 5000})              
                }
            })()
            // dispatch(userLoginAsync({username, password}));
        }

    }
    const validate = () => {
        let errors = {

        }
        if (username.trim() === '') {
            errors.username = ['Hãy nhập tên đăng nhập của bạn']

        }
        if (password.trim() === '') {
            errors.password = ['Hãy nhập mật khẩu của bạn']
            
        }
        return errors
    }

    const styles = {
        body: {
            backgroundImage: "url(" + Background + ")",
           
        }
    }
    
    return (
        <div style={styles.body}>
            {currentUser_id !== ""
             ? <Navigate replace to="/" />
             
        :   <div className="signin-page">   
                <div className="signin">
                    <div className="signin__form">
                        <p className="signin__label">Xin chào! 🇻🇳</p>
                        <form onSubmit={handleSubmit}>
                            <div class="form__fields">
                                <TextField
                                    autoFocus
                                    error = {errors.username ? true: false}
                                    helperText= {errors.username ? errors.username[0]: ''}
                                    onChange={handleChangeUsername}
                                    margin="dense"
                                    id="username"
                                    name="username"
                                    label="Tên đăng nhập"
                                    type="text"
                                    fullWidth
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    onChange={handleChangePassword}
                                    margin="dense"
                                    id="password"
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    variant="standard"
                                    error = {errors.password ? true: false}
                                    helperText= {errors.password ? errors.password[0]: ''}
                                    fullWidth
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HttpsIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                            </div>
                            <div className="flex-space-between">
                                <div></div>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    loading={loading}
                                    loadingPosition="end"
                                >
                                    Đăng nhập
                                </LoadingButton>
                            </div>
                            {/* {errorMessage && <p>{errorMessage}</p>} */}
                        </form>
                    </div>
                    <div className="signin__logo">
                     
                        <img style={styles.Logo_img} src={logo_Boyte} alt="logo_Bo y te" draggable></img>
                        <p >HỆ THỐNG ĐIỀU TRA DÂN SỐ VIỆT NAM</p>
                        
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Signin;