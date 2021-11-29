import React from 'react';
import TableData from './TableData';
const tableBody = [
    {
        id: "19020201",
        fullName: "Nguyen Huu An",
        gender: "Nam",
        dateOfBirth: "15/02/2001",
        injectedVaccines: 2,
        ethnic: "Kinh",
        age: 20,
        phoneNumber: "0123456789"
    },
    {
        id: "19020201",
        fullName: "Nguyen Huu An",
        gender: "Nam",
        dateOfBirth: "15/02/2001",
        injectedVaccines: 2,
        ethnic: "Kinh",
        age: 20,
        phoneNumber: "0123456789"
    },
    {
        id: "19020201",
        fullName: "Nguyen Huu An",
        gender: "Nam",
        dateOfBirth: "15/02/2001",
        injectedVaccines: 2,
        ethnic: "Kinh",
        age: 20,
        phoneNumber: "0123456789"
    },
    {
        id: "19020201",
        fullName: "Nguyen Huu An",
        gender: "Nam",
        dateOfBirth: "15/02/2001",
        injectedVaccines: 2,
        ethnic: "Kinh",
        age: 20,
        phoneNumber: "0123456789"
    },
    {
        id: "19020201",
        fullName: "Nguyen Huu An",
        gender: "Nam",
        dateOfBirth: "15/02/2001",
        injectedVaccines: 2,
        ethnic: "Kinh",
        age: 20,
        phoneNumber: "0123456789"
    },
];

const TableBody = () => {
    return (
        <tbody>
            {tableBody.map(element => {
                return <TableData {...element} />
            })}
        </tbody>
    );
}

export default TableBody;