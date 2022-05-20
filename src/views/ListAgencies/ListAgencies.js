import React, { useState, useEffect } from 'react';

import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import {column_titles, searchByAgency} from '../../constants/agency/agency';
import { loadAgenciesAsync } from '../../redux/reducers/agencies/agencies.thunk';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import AgencyForm from '../agency/AgencyForm';
import {userToggleCompletedDeclare} from "../../redux/reducers/user/user.thunk"
import {toggleCompletedDeclareApi } from "../../api/apiAgencies"
import {addToast} from "../../utils"

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
        if (agencies.length === 0) {
            dispatch(loadAgenciesAsync());
        }
    }, []);
    // const { currentUser } = useSelector(state => state.user);
    const renderData = (item, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}
                onClick={() => navigate(`${item.id}`)}
            >
                <TableCell>
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell align='center'>
                    <span className={`badge ${item.staff.declared_permission? 'badge-success': 'badge-pending '}`}>
                        {item.staff.declared_permission? 'Đang bật':'Đã tắt'}
                    </span>
                 
                </TableCell>
                <TableCell align='center'>
                    {
                        item.id.length !== 8? (
                            <span className={`badge ${item.completed_declare? 'badge-success': 'badge-pending '}`}>
                                {item.completed_declare? 'Đã khai báo xong': 'Chưa khai báo xong'}
                            </span>
                        ):(
                            <span className={`badge badge-success`}>
                                Do bạn giám sát trực tiếp
                            </span>
                        )
                    }
                    
                </TableCell>
            </TableRow>
        )
    }

    const toggleCompletedDeclare = () => {
        (async () => {
            try {
                let res = await toggleCompletedDeclareApi()
                if (res.status === 200) {
                    dispatch(userToggleCompletedDeclare(res.data.current))
                    addToast(
                        {
                            type:`${res.data.current? 'success': 'info'}`, 
                            title:'Xong!', 
                            message:`${res.data.current? "Chúc mừng bạn đã hoàn thành khai báo":"Ỏ. Sớm hoàn thành nhé!"}`, 
                            duration: 5000}
                        )
                }
                
            } catch (error) {
                
            }
        })()
    }

    if (currentUser.level === "4") {
        navigate('/')
    }
    
    return (
        <div className="page-limit">
            <div style={styles.header}>
                <div>
                    {
                        (currentUser && currentUser.level === "3")? (
                            <Button variant='contained'
                                onClick={toggleCompletedDeclare}
                            >
                                {!currentUser.agency.completed_declare? 'Đánh dấu khai báo xong':'Đánh dấu chưa khai báo xong'}
                            </Button>
                        ):null
                    }
                </div>
                {
                    currentUser && currentUser.level <= "3"? (
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
                searchEngine = {true}
                showFilterButton = {false}
           />
        </div>
        
    )
}

export default ListAgencies;