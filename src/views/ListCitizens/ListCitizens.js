import React, { useState, useEffect } from 'react';
import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { citizen_columns, educational, gender, searchByCitizen } from '../../constants/citizen/citizens';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { Navigate } from 'react-router';
import Button from '@mui/material/Button'

const styles = {
    root: {
        display: "block",
        background: "white",
        paddingTop: "15vh",
        paddingLeft: "17.36vw"
    },
    header: {
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
};

const ListCitizens = () => {
    // const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { citizens } = useSelector(state => state.citizens);
    useEffect(() => {
        dispatch(loadCitizensAsync());
    }, []);
    // const { currentUser } = useSelector(state => state.user);
    const RenderData = (item, index) => {
        const [redirect, setRedirect] = useState(false);
        const handleClick = () => {
            setRedirect(true);
        }
        if (redirect) return (<Navigate replace to={`/list-citizens/${item.id}`} />)
        return (
            <TableRow onClick={handleClick} key={index} hover role="checkbox" tabIndex={-1} >
                <TableCell>{item.id_number? item.id_number: "-"}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.dob}</TableCell>
                <TableCell>{gender[item.gender]}</TableCell>
                <TableCell>{item.ethnic}</TableCell>
                <TableCell>{item.religion? item.religion: "-"}</TableCell>
                <TableCell>{educational[item.educational]}</TableCell>
                <TableCell>{item.occupations? item.occupations: "-" }</TableCell>
                <TableCell>{item.home_town? item.home_town: "-"}</TableCell>
                <TableCell>{item.address_line1? item.address_line1: "-"}</TableCell>
                <TableCell>{item.address_line2? item.address_line2: "-"}</TableCell>            
            </TableRow>
        )
    }
    return (
        <div class="page-limit" style={{}}>
            <div style={styles.header}>
                <div></div>
          
                <Button variant="contained">
                    Khai báo công dân mới 
                </Button>
            </div>
            <TableExtra
                searchBy = {searchByCitizen}
                title = "Danh sách dân số"
                name="ListCitizensTitles"
                columns = {citizen_columns}
                data = {citizens}
                renderData = {RenderData}
            />
        </div>
    )
}

export default ListCitizens;