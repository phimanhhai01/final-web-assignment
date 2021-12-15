import React, { useEffect } from 'react';
import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { citizen_columns, educational, gender, searchByCitizen } from '../../constants/citizen/citizens';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { useNavigate } from 'react-router';
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
    const dispatch = useDispatch();
    const { citizens } = useSelector(state => state.citizens);

    const {currentUser} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(loadCitizensAsync());
        //dispatch(userPersist());
    }, []);
    const navigate = useNavigate();
    const renderData = (item, index) => {
        
        const handleClick = () => {
            navigate(`/list-citizens/${item.id}`)
        }
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
                {/* <TableCell>{item.home_town? item.home_town: "-"}</TableCell> */}
                <TableCell>{item.address_line1? item.address_line1: "-"}</TableCell>
                {/* <TableCell>{item.address_line2? item.address_line2: "-"}</TableCell>             */}
            </TableRow>
        )
    }
    return (
        <div className="page-limit" style={{}}>
            <div style={styles.header}>
                <div></div>
                {
                    currentUser && currentUser.level >= "3"? (
                        <Button variant="contained">
                            Khai báo công dân mới 
                        </Button>
                    ):null
                }
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
    )
}

export default ListCitizens;