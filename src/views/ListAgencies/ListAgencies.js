import React, { useState, useEffect } from 'react';

import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import {column_titles, searchByAgency} from '../../constants/agency/agency';
import { loadAgenciesAsync } from '../../redux/reducers/agencies/agencies.thunk';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import AgencyForm from '../agency/AgencyForm';

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


const ListAgencies = () => {
    // const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { agencies } = useSelector(state =>{
        return state.agencies
    } );
    console.log("🚀 ~ file: ListUser.js ~ line 23 ~ ListAgencies ~ subagencies", agencies)
    const {currentUser} = useSelector(state => state.user);

    useEffect(() => {
        console.log("call Agency")
        dispatch(loadAgenciesAsync());
    }, []);
    // const { currentUser } = useSelector(state => state.user);
    const renderData = (item, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}
                onClick={() => navigate(`/management/${item.id}`)}
            >
                <TableCell>
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
            </TableRow>
        )
    }
    
    return (
        <div className="page-limit">
            <div style={styles.header}>
                <div></div>
                {
                    currentUser && currentUser.level >= "3"? (
                        <AgencyForm label="Thêm đơn vị"/>
                    ):null
                }
                
            </div>
           <TableExtra 
                name="agencies"
                title="Các đơn vị dưới quyền"
                data = {agencies}
                columns = {column_titles}
                searchBy = {searchByAgency}
                renderData = {renderData}
           />
        </div>
        
    )
}

export default ListAgencies;