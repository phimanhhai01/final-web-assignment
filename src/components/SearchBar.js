import {ReactComponent as Magnifier} from '../images/magnifier.svg';
import { searchBy } from '../constants/filter';

const SearchBar = () => {
    const styles = {
        root: {
            display: "flex",
            width: "100%",
            height: "5vh",
            borderRadius: "10px",
            border: "black 1px solid",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "0.5rem"
        },
        seperateLine: {
            background: "black",
            width: "1.8px",
            height: "3.5vh",
        },
        icon: {
            height: "3vh",
            width: "4vw",
            color: "white",
        },
        input: {
            height: "4.8vh",
            width: "100%",
            outline: "none",
            border: "none",
        },
        dropdownList: {
            height: "4.8vh",
            outline: "none",
            marginRight: "0.3vw",
            border: "none",
            paddingLeft: "0.3vw",
        },
        option: {
            zoom: "1.5"
        }
    }
    return (
        <div style={styles.root}>
            <Magnifier style={styles.icon}/>
            <div style={styles.seperateLine}></div>
            <input type="text" style={styles.input}></input>
            <div style={styles.seperateLine}></div>
            <select name="searchBy" id="searchBy_DropdownList" style={styles.dropdownList}>
                {searchBy.map((element, index) => {
                    return <option key={index} style={styles.option}>{element}</option>
                })}
            </select>
        </div>
    );
}

export default SearchBar;