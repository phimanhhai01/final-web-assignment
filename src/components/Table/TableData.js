import React from "react";

const TableData = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.fullName}</td>
            <td>{props.gender}</td>
            <td>{props.dateOfBirth}</td>
            <td>{props.injectedVaccines}</td>
            <td>{props.ethnic}</td>
            <td>{props.age}</td>
            <td>{props.phoneNumber}</td>
        </tr>
    );
}

export default TableData;