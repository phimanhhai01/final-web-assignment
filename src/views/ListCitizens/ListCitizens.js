import React, { useState, useEffect } from 'react';
import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell, Dialog } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { citizen_columns, educational, gender, searchByCitizen } from '../../constants/citizen/citizens';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { Navigate, useNavigate } from 'react-router';
import Button from '@mui/material/Button'
import AddCitizen from "./AddCitizen";

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
    const dispatch = useDispatch();
    const { citizens } = useSelector(state => state.citizens);
    useEffect(() => {
        dispatch(loadCitizensAsync());
    }, []);
    const navigate = useNavigate()
    const renderData = (item, index) => {
        const handleClick = () => {
            navigate(`/list-citizens/${item.id}`)
        }
        return (
            <TableRow onClick={handleClick} key={index} hover role="checkbox" tabIndex={-1} >
                <TableCell>{item.id_number? item.id_number: "-"}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{new Date(item.dob).toLocaleDateString('en-GB')}</TableCell>
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
            <AddCitizen/>
        </Dialog>
        <div class="page-limit" style={{}}>
            <div style={styles.header}>
                <div></div>
                <Button variant="contained" onClick={handleOpen}>
                    Khai báo công dân mới 
                </Button>
            </div>
            <TableExtra
                searchBy = {searchByCitizen}
                title = "Danh sách dân số"
                name="ListCitizensTitles"
                columns = {citizen_columns}
                data = {citizens}
                renderData = {renderData}
            />
        </div>
        </>
    )
}

export default ListCitizens;