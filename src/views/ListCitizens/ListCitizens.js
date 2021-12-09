import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import Title from '../../components/Title';

import A1Filter from '../../components/Filter/A1Filter';
import { useSelector, useDispatch } from 'react-redux';
import { ListCitizensTitles, educational, gender } from '../../constants/citizen/citizens';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { Navigate, useLocation } from 'react-router';
import { loadCitizenByIdAsync } from '../../redux/reducers/citizens/citizens.thunk';
const styles = {
    root: {
        display: "block",
        background: "white",
        paddingTop: "15vh",
        paddingLeft: "17.36vw"
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
            <tr onClick={handleClick} key={index}>
                <td>{item.id_number? item.id_number: "-"}</td>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{gender[item.gender]}</td>
                <td>{item.ethnic}</td>
                <td>{item.religion? item.religion: "-"}</td>
                <td>{educational[item.educational]}</td>
                <td>{item.occupations? item.occupations: "-" }</td>
                <td>{item.home_town? item.home_town: "-"}</td>
                <td>{item.address_line1? item.address_line1: "-"}</td>
                <td>{item.address_line2? item.address_line2: "-"}</td>            
            </tr>
        )
    }
    return (
        <div style={{}}>
            <Title name="Danh sách dân số"/>
            <Table 
                name="ListCitizensTitles"
                heads = {ListCitizensTitles}
                data = {citizens}
                renderData = {RenderData}
            />
            {/* {currentUser.level === "1" && <A1Filter />}
            <Table /> */}
        </div>
    )
}

export default ListCitizens;