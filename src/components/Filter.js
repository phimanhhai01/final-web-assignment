import Radium from 'radium';

import filterIcon from "../images/filterIcon.png";
import { filterBy } from '../constants/filter';

const Filter = () => {
    const styles = {
        root: {
            display: "flex",
            width: "9vw",
            height: "5vh",
            background: "#2E3192",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.5rem",
            ':hover': {
                cursor: "pointer",
            },
        },
        icon: {
            marginLeft: "0.5rem",
            height: "3vh",
            color: "white",
        },
        filter: {
            padding: "0.5rem",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            appearance: "none",
        },
        listMenu: {
            display: "none",
            position: "absolute",
            top: "calc(100% + 7px)",
            background: "#FFFFFF",
            padding: "0",
            listStyleType: "none",
            width: "160px",
            ':hover': {
                display: "block",
            }
        },
        listItem: {

        }
    }
    return (
        <div key={1} style={styles.root}>
            <img style={styles.icon} src={filterIcon} alt="filterIcon"/>
            <div style={styles.filter}>
                <p>Bộ lọc</p>
                <ul key={2} style={styles.listMenu}>
                    {filterBy.map((element, index) => {
                        return <li key={index} style={styles.listItem}>{element}</li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Radium(Filter);