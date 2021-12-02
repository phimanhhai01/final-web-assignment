import React from "react";

const TableData = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.gender}</td>
            <td>{props.dob}</td>
            <td>{props.injected_vaccines}</td>
            <td>{props.ethnic}</td>
        </tr>
    );
}

export default TableData;