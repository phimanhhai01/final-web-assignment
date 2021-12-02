import React,{useEffect} from 'react';
import TableData from './TableData';
import { useSelector, useDispatch } from 'react-redux';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
// const tableBody = [
//     {
//         id: "19020201",
//         fullName: "Nguyen Huu An",
//         gender: "Nam",
//         dateOfBirth: "15/02/2001",
//         injectedVaccines: 2,
//         ethnic: "Kinh",
//         age: 20,
//         phoneNumber: "0123456789"
//     },
//     {
//         id: "19020201",
//         fullName: "Nguyen Huu An",
//         gender: "Nam",
//         dateOfBirth: "15/02/2001",
//         injectedVaccines: 2,
//         ethnic: "Kinh",
//         age: 20,
//         phoneNumber: "0123456789"
//     },
//     {
//         id: "19020201",
//         fullName: "Nguyen Huu An",
//         gender: "Nam",
//         dateOfBirth: "15/02/2001",
//         injectedVaccines: 2,
//         ethnic: "Kinh",
//         age: 20,
//         phoneNumber: "0123456789"
//     },
//     {
//         id: "19020201",
//         fullName: "Nguyen Huu An",
//         gender: "Nam",
//         dateOfBirth: "15/02/2001",
//         injectedVaccines: 2,
//         ethnic: "Kinh",
//         age: 20,
//         phoneNumber: "0123456789"
//     },
//     {
//         id: "19020201",
//         fullName: "Nguyen Huu An",
//         gender: "Nam",
//         dateOfBirth: "15/02/2001",
//         injectedVaccines: 2,
//         ethnic: "Kinh",
//         age: 20,
//         phoneNumber: "0123456789"
//     },
// ];

const TableBody = () => {
    const token = localStorage.getItem("token");
    const { citizens } = useSelector(state => state.citizens);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCitizensAsync(token));
    }, []);
    return (
        <tbody>
            {citizens && citizens.map((element, index) => {
                return <TableData key={index} {...element} />
            })}
        </tbody>
    );
}

export default TableBody;