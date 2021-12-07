import React from "react";

const TableData = (props) => {
    const styles = {
        root: {
            borderTop: "1px solid black",
            textAlign: "center",
            height: "6vh"
        }
    }

    return (
        <tr style={styles.root}>
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
        </tr>
    );
}

export default TableData;