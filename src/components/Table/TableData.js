import React, { useState } from "react";
import Profile from "./Profile";
import Dialog from '@material-ui/core/Dialog';
import CitizenProfile from "../../views/ListCitizens/CitizenProfile";
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
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.dob}</td>
            <td>{props.dod === null && "Không"}</td>
            <td>{props.gender}</td>
            <td>{props.ethnic}</td>
            <td>{props.religion === null && "Không"}</td>
            <td>{props.educational === "high" && "Đại học"}</td>
            <td>{props.marital_status === false ? "Độc thân" : "Đã kết hôn" }</td>
            <td>{props.address}</td>
            {/* <td>
                <button onClick={handleOpen}></button>
            </td> */}
        </tr>
        </>
    );
}

export default TableData;