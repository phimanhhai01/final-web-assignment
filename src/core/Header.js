import {ReactComponent as Avatar} from '../images/default-avatar.svg';
import {ReactComponent as Notice} from '../images/noNotice.svg';

const Header = () => {
    const styles = {
        root: {
            display: "flex",
            position: "fixed",
            background: "#2E3192",
            marginLeft: "17.36vw",
            width: "82.64vw",
            height: "15vh",
            justifyContent: "space-between"
        },
        name: {
            paddingLeft: "45px",
            color: "white",
            fontSize: "37px",
            fontWeight: "bold",
        },
        avatar: {
            width: "50px",
            height: "50px",
            paddingTop: "33px",
            paddingRight: "37px"
        }
    }
    return (
        <div style={styles.root}>
            <p style={styles.name}>HỆ THỐNG ĐIỀU TRA DÂN SỐ VIỆT NAM</p>
            <div>
                <Notice style={styles.avatar}/>
                <Avatar style={styles.avatar}/>
            </div>
        </div>
    );
}

export default Header;