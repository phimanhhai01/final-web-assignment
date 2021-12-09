import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo_Boyte from "../images/logo_Boyte.png";

import {ReactComponent as HourGlass} from '../images/hourglass.svg';
import {ReactComponent as DataAnalysis} from '../images/data-analysis.svg';
import {ReactComponent as List} from '../images/list-text.svg';
import {ReactComponent as Management} from '../images/team.svg';
import {ReactComponent as Add} from '../images/add-friend.svg';

import { sidebar_items } from "../constants/menu/menu";
import '../style/menu.css'
const styles = {
    root: {
        position: "fixed",
        background: "white",
        height: "100%",
        width: "var(--sidebar-width)",
        // borderRight: "black 1px solid",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        // marginRight: "1rem"
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
    iconColor: "",
}

/* const [dataAnalysisColor, setColor] = useState("#FFFFFF")
 */

const Menu = () => {
    console.log("render Menu")
    const location = useLocation();
    console.log("🚀 ~ file: Menu.js ~ line 49 ~ Menu ~ location", location)
    
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo_Boyte} alt="logo_Boyte"/>
            </div>
            
            
            <ul className="sidebar__menu">
                {
                    sidebar_items.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path} className={`menu__item ${location.pathname === item.path? "menu__item__active":""}`}>
                                <i className={item.icon}></i>
                                <span>
                                    {item.label}
                                </span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div> 
    );
}

export default Menu;
const isActive = (location, path) => {
    return {

    }
    // const style = {
    //     textDecoration: 'none',
    //     padding: "12px",
    //     marginRight: "6px",
    //     display: "flex",
    //     alignItems: "center"
    // }
    // if(location.pathname === path) {
    //     styles.iconColor = "#FFFFFF"
    //     return {
    //         color: "#FFFFFF",
    //         background: "#2E3192",
    //         borderRadius: "0px 25px 25px 0px",
    //         ...style
    //     }
    // } else {
    //     styles.iconColor = "#000000"
    //     return {
    //     color: "#000000",
    //     ...style
    //     }
    // }
};

const isActiveLink = (location, path) => {
    return {

    }

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
            backgroundColor: "#2E3192",
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