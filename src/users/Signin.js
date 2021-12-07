import React, { useState } from "react";
import { userLoginAsync } from "../redux/reducers/user/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import logo_Boyte from './logo_Boyte.png';
import Background from './connectivity.jpeg';

// import { Redirect } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import Radium from 'radium';

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

    const styles = {
        body: {
            backgroundImage: "url(" + Background + ")",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            fontFamily: "Helvetica, sans-serif",
            background: "#2E3192",
        },
        SignIn_Area: {
            display: "flex",
            paddingTop: "15vh",
            justifyContent: "center",
        },
        SignIn: {
            display: "flex",
            flexWrap: "wrap",
            width: "30vw",
            height: "66.7vh",
            background: "white",
            flexDirection: "column",
            borderRadius: "20px 0 0 20px",
        },
        Logo: {
            display: "inline-block",
            flexWrap: "wrap",
            width: "30vw",
            height: "66.7vh",
            background: "white",
        },
        Xinchao: {
            fontSize: "30px",
            fontWeight: "bold",
            padding: "1.7vh 0 0 3vw",
            marginBottom: "7.5vh",
        },
        InputBlock: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "4vh",
            padding: "0 3vw 0 3vw",
        },
        label: {
            fontSize: "15px",
            fontWeight: "bold",
            paddingBottom: "1vh",
        },
        input: {
            paddingLeft: "1.5vw",
            fontSize: "15px",
            borderWidth: "0",
            borderBottomWidth: "0.3vh",
            borderColor: "#2E3192",
            height: "6vh",
            ':focus': {
                borderBottomWidth: "0vh",
            }
        },
        submitButton: {
            background: "#2E3192",
            color: "white",
            fontSize: "17px",
            borderRadius: "17px",
            border: "none",
            width: "10vw",
            height: "5vh",
        },
        ButtonBlock: {
            marginTop: "8vh",
            paddingLeft: "10vw",
        },
        Logo_Area: {
            width: "30vw",
            background: "rgba(255,255,255,0.85)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0 20px 20px 0",
        },
        Logo_img: {
            width: "50%",
            height: "auto",
        },
        AppName: {
            fontWeight: "bold",
            fontSize: "26px",
            textAlign: "center",
            lineHeight: "35px",
        }
    }
    return (
        <div style={styles.body}>
            {currentUser
             ? <Navigate replace to="/" />
             
        :   <div style={styles.SignIn_Area}>   
                <div style={styles.SignIn}>
                    <p style={styles.Xinchao}>Xin chào! 🇻🇳</p>
                    <form onSubmit={handleSubmit}>
                        {isLoading && <p>is loading</p>}
                        <div style={styles.InputBlock}>
                            <label style={styles.label}>Tên đăng nhập</label>
                            <input style={styles.input} key={1} type="text" name="username" value={username} onChange={handleChangeUsername} />
                        </div>
                        <div style={styles.InputBlock}>
                            <label style={styles.label}>Mật khẩu</label>
                            <input style={styles.input} key={2} type="password" name="password" value={password} onChange={handleChangePassword}/>
                        </div>
                        <div style={styles.ButtonBlock}>
                            <button style={styles.submitButton} type='submit'>Đăng nhập</button>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                    </form>
                </div>
                <div style={styles.Logo_Area}>
                    <img style={styles.Logo_img} src={logo_Boyte} alt="logo_Boyte"></img>
                    <p style={styles.AppName}>HỆ THỐNG ĐIỀU TRA DÂN SỐ VIỆT NAM</p>
                </div>
            </div>}
        </div>
    );
}

export default Radium(Signin);