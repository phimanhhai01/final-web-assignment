import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/reducers/user/user.thunk";
import { useNavigate } from "react-router";
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(userLogout());
        navigate("/signin")
    }
    return (
        <div>
            <h1>Hello world</h1>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default Home;