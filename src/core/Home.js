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
    const styles = {
        root: {
            marginLeft: "300px"
        }
    }
    return (
        <div style={styles.root}>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default Home;