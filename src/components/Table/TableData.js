import React, { useState } from "react";
import Profile from "./Profile";
import Dialog from '@material-ui/core/Dialog';
import CitizenProfile from "../../views/ListCitizens/CitizenProfile";
const educational = {
    primary: "Tiểu học",
    secondary: "Trung học cơ sở",
    high: "Trung học phổ thông",
    university: "Cao đẳng / Đại học",
    master: "Sau đại học"

}
const TableData = (props) => {
    const styles = {
        root: {
            borderTop: "1px solid black",
            textAlign: "center",
            height: "6vh"
        }
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
        <Dialog
                open={open}
                maxWidth={'xl'}
                onClose={handleClose}
        >
            <CitizenProfile {...props}/>
        </Dialog>
        <tr onClick={handleOpen} style={styles.root}>
            <td>{props.id_number? props.id_number: "-"}</td>
            <td>{props.name}</td>
            <td>{props.dob}</td>
            <td>{props.gender}</td>
            <td>{props.ethnic}</td>
            <td>{props.religion? props.religion: "-"}</td>
            <td>{educational[props.educational]}</td>
            <td>{props.occupations? props.occupations: "-" }</td>
            <td>{props.home_town? props.home_town: "-"}</td>
            <td>{props.address_line1? props.address_line1: "-"}</td>
            <td>{props.address_line2? props.address_line2: "-"}</td>

            {/* <td>
                <button onClick={handleOpen}></button>
            </td> */}
        </tr>
        </>
    );
}

export default TableData;