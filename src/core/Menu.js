import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo_Boyte from "../images/logo_Boyte.png";
import growing from "../images/growing.png";
import listText from "../images/list-text.png";
import dataAnalys from "../images/data-analysis.png";
import team from "../images/team.png";

const styles = {
    root: {
        position: "fixed",
        background: "white",
        height: "100%",
        width: "15%",
    },
    logo: {
        margin: "20px auto",
        display: "block"
    },
    ulStyle: {
        listStyleType: "none",
        paddingLeft: "0"
    },
    linkStyle: {
        textDecoration: 'none',
        fontsize: "20px"
    }
}
const Menu = () => {
    const location = useLocation();
    return (
        <div style={styles.root}>
            <div>
                <img style={styles.logo} src={logo_Boyte} alt="logo_Boyte"/>
            </div>
            <ul style={styles.ulStyle}>
                <li style={isActive(location, "/")}>
                    <Link to="/" style={isActiveLink(location, "/")}>Tiến Độ Điều Tra</Link>
                </li>                        
                <li style={isActive(location, "/list-citizens")}>
                    <Link to="/list-citizens" style={isActiveLink(location, "/list-citizens")}>Danh sách dân số</Link>
                </li>
                <li style={isActive(location, "/analys-citizens")}>
                    <Link to="/analys-citizens" style={isActiveLink(location, "/analys-citizens")}>Phân tích quản lý</Link>
                </li>
                <li style={isActive(location, "/management")}>
                    <Link to="/management" style={isActiveLink(location, "/management")}>Quản lý</Link>
                </li>
                <li style={isActive(location, "/family")}>
                    <Link to="/family" style={isActiveLink(location, "/family")}>Quản lý gia đình</Link>
                </li>
            </ul>
        </div> 
    );
}

export default Menu;
const isActive = (location, path) => {
    const style = {
        textDecoration: 'none',
        padding: "12px",
        marginRight: "6px"
    }
    if(location.pathname === path) return {
        color: "#ffffff",
        background: "#0E256B",
        borderRadius: "0px 25px 25px 0px",
        ...style
    }
    else return {
        color: "#000000",
        ...style
    }
};

const isActiveLink = (location, path) => {
    const linkStyle = {
        textDecoration: 'none',
        fontsize: "20px",
        padding: "8px",
    }
    if(location.pathname === path) return {
        color: "#ffffff",
        background: "#0E256B",
        fontWeight: "bold",
        ...linkStyle
    }
    else return {
        color: "#000000",
        ...linkStyle
    }
}