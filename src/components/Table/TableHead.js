import React from 'react';
const titles = [
    "ID",
    "Họ và tên",
    "Giới tính",
    "Ngày sinh",
    "Số  mũi vacxin",
    "Dân tộc",
    "Tuổi",
    "Số điện thoại"
]
const TableHead = (props) => {
    return (
        <thead>
            <tr>
                {titles.map(element => {
                    return <th>{element}</th>
                })}
            </tr>
        </thead>
    );
}

export default TableHead;