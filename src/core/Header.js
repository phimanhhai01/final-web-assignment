import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from "../redux/reducers/user/user.thunk";
import { resetAgency } from "../redux/reducers/agencies/agencies.thunk";
import { useNavigate } from 'react-router';
import {ReactComponent as Avatar} from '../images/default-avatar.svg';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { IconButton } from '@mui/material';
import "../style/header.css"

//import {ReactComponent as Notice} from '../images/noNotice.svg';
const styles = {
    root: {
        display: "flex",
        // background: "#2E3192",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        // paddingLeft: "45px",
        // color: "white",
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    avatar: {
        width: "50px",
        height: "50px",
        fontSize: "1.2rem",
        // paddingTop: "33px",
        // paddingRight: "37px"
    }
}

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const agency = useSelector(state => state.user.currentUser.agency);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(userLogout())
        dispatch(resetAgency())
        navigate("/signin")
        
        handleClose()
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className="header" style={styles.root}>
            <p className="header__name">{agency && agency.name}</p>
            <div>
               
                {/* <Button onClick={handleLogOut} variant="contained">Đăng xuất</Button> */}
                <IconButton
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick} 
                >
                    <AccountCircleRoundedIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handleClose}>Đổi mật khẩu</MenuItem>
                    <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Header;