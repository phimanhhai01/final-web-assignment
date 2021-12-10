import React from 'react';
import { useSelector } from 'react-redux';
import {ReactComponent as Avatar} from '../images/default-avatar.svg';
import {ReactComponent as Notice} from '../images/noNotice.svg';
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
    const {currentUser} = useSelector(state => state.user);
    
    return (
        <div style={styles.root}>
            {/* <p style={styles.name}>{currentUser.agency.name}</p> */}
            <div>
                <Notice style={styles.avatar}/>
                <Avatar style={styles.avatar}/>
            </div>
        </div>
    );
}

export default Header;