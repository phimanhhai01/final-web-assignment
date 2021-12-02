import React from 'react';
import { titles } from '../../constants/citizen/citizens';
const TableHead = (props) => {
    return (
        <thead>
            <tr>
                {titles.map((element, index) => {
                    return <th key={index}>{element}</th>
                })}
            </tr>
        </thead>
    );
}

export default TableHead;