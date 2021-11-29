import React from "react";
import { Link } from "react-router-dom";
const Menu = ({children}) => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/list-citizens">Danh sách dân số</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </div> 
    );
}

export default Menu;
