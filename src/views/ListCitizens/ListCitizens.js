import React, { useEffect, useState } from 'react';
import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell, Dialog } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { citizen_columns, educational, gender, searchByCitizen } from '../../constants/citizen/citizens';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { useNavigate } from 'react-router';
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
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const { filterList, citizens } = useSelector(state => state.citizens);
    
    const filteredListCitizens = (citizens, filterList) => {
        let filteredCitizens = [];
        let filterListId = filterList.map(e => e.id);
        filteredCitizens = citizens.filter(e => {
            for(let i = 0 ; i<filterListId.length ; i++){
                if(e.village_id.search(filterListId[i]) !== -1){
                    return true;
                }
            }
        });
        console.log(filteredCitizens);
        return filteredCitizens;
    }
    const getAgencyNames = (filterList) => {
        let filteredListNames = filterList.map(e => e.name);
        return filteredListNames.join(", ");
    }
    useEffect(() => {
        if (citizens.length === 0) {
            dispatch(loadCitizensAsync());
        }
        //dispatch(userPersist());
    }, []);
    const renderData = (item, index) => {
        return (
            <TableRow onClick={() => navigate(`${item.id}`)} key={index} hover role="checkbox" tabIndex={-1} >
                <TableCell>{item.id_number? item.id_number: "-"}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{new Date(item.dob).toLocaleDateString('en-GB')}</TableCell>
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
                    currentUser && (currentUser.level === "4" || currentUser.level === "3")? (
                        <AddCitizen/>
                    ):null
                }
            </div>
            <TableExtra
                searchBy = {searchByCitizen}
                title = {filterList.length > 0 ? `Danh sách dân số  thuộc: ${getAgencyNames(filterList)}` : `Danh sách dân số  thuộc toàn tỉnh`}
                name="ListCitizensTitles"
                columns = {citizen_columns}
                data = {filterList.length > 0 ? filteredListCitizens(citizens, filterList) : citizens}
                renderData = {renderData}
            />
        </div>
    )
}

export default ListCitizens;