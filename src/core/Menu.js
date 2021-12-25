import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo_Boyte from "../images/logo_Boyte.png";
import { sidebar_items } from "../constants/menu/menu";
import '../style/menu.css'

const Menu = () => {
    // console.log("render Menu")
    const location = useLocation();
    console.log("🚀 ~ file: Menu.js ~ line 49 ~ Menu ~ location", location)
    const toggleMenu = () => {
        let current = document.documentElement.style.getPropertyValue('--sidebar-width')
        // alert(current)
        // document.querySelector('.sidebar').classList.toggle("sidebar-hidden");
        if (current !== '0') {
    
            document.documentElement.style.setProperty('--sidebar-width', '0');

        } else {
            document.documentElement.style.setProperty('--sidebar-width', '250px');
        }
        
    }
    return (
        <div className="sidebar">
            {/* <div className="menu-toggle"  onClick = {toggleMenu}>
                <i class='bx bx-grid'></i>
            </div> */}
            <div className="sidebar__logo">
                <img src={logo_Boyte} alt="logo_Boyte" draggable='false'/>
            </div>
            
            
            <ul className="sidebar__menu">
                {
                    sidebar_items.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path} 
                                className={`menu__item ${(location.pathname.startsWith(item.path) && index !==0) || 
                                    (index ===0 && location.pathname === item.path)? "menu__item__active":""}`}>
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