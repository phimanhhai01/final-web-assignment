import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo_Boyte from "../images/logo_Boyte.png";

import {ReactComponent as HourGlass} from '../images/hourglass.svg';
import {ReactComponent as DataAnalysis} from '../images/data-analysis.svg';
import {ReactComponent as List} from '../images/list-text.svg';
import {ReactComponent as Management} from '../images/team.svg';
import {ReactComponent as Add} from '../images/add-friend.svg';

const styles = {
    root: {
        position: "fixed",
        background: "white",
        height: "100%",
        width: "17.36vw",
        borderRight: "black 1px solid",
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
    },
    icon: {
        width: "1.7vw",
        height: "auto",
    },
    iconColor: ""
}

/* const [dataAnalysisColor, setColor] = useState("#FFFFFF")
 */

const Menu = () => {
    const location = useLocation();
    return (
        <div style={styles.root}>
            <div>
                <img style={styles.logo} src={logo_Boyte} alt="logo_Boyte"/>
            </div>
            <ul style={styles.ulStyle}>
                <li style={isActive(location, "/")}>
                    <HourGlass style={styles.icon} fill={styles.iconColor}/>
                    <Link to="/" style={isActiveLink(location, "/")}>Tiến Độ Điều Tra</Link>
                </li>                        
                <li style={isActive(location, "/list-citizens")}>
                    <List style={styles.icon} fill={styles.iconColor}/>
                    <Link to="/list-citizens" style={isActiveLink(location, "/list-citizens")}>Danh sách dân số</Link>
                </li>
                <li style={isActive(location, "/analys-citizens")}>
                    <DataAnalysis style={styles.icon} fill={styles.iconColor}/>
                    <Link to="/analys-citizens" style={isActiveLink(location, "/analys-citizens")}>Phân tích quản lý</Link>
                </li>
                <li style={isActive(location, "/management")}>
                    <Management style={styles.icon} fill={styles.iconColor}/>
                    <Link to="/management" style={isActiveLink(location, "/management")}>Quản lý</Link>
                </li>

                <li style={isActive(location, "/update-citizens-data")}>
                    <Add style={styles.icon} fill={styles.iconColor}/>
                    <Link to="/update-citizens-data" style={isActiveLink(location, "/update-citizens-data")}>Nhập liệu</Link>
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
        marginRight: "6px",
        display: "flex",
        alignItems: "center"
    }
    if(location.pathname === path) {
        styles.iconColor = "#FFFFFF"
        return {
            color: "#FFFFFF",
            background: "#2E3192",
            borderRadius: "0px 25px 25px 0px",
            ...style
        }
    } else {
        styles.iconColor = "#000000"
        return {
        color: "#000000",
        ...style
        }
    }
};

const isActiveLink = (location, path) => {
    const linkStyle = {
        textDecoration: 'none',
        fontSize: "20px",
        paddingLeft: "8px",
        display: "flex",
        alignItems: "center"
    }
    if(location.pathname === path) {
        styles.iconColor = "#FFFFFF"
        return {
            color: "#FFFFFF",
            background: "#2E3192",
            fontWeight: "bold",
            ...linkStyle
        }
    } else {
        styles.iconColor = "#000000"
        return {
            color: "#000000",
            ...linkStyle
        }
    }
}