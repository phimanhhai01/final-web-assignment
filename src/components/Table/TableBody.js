import React,{useEffect} from 'react';
import TableData from './TableData';
import { useSelector, useDispatch } from 'react-redux';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { loadFamiliesAsync } from '../../redux/reducers/families/families.thunk';

/* const ListCitizensTitles = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { citizens } = useSelector(state => state.citizens);
    useEffect(() => {
        dispatch(loadCitizensAsync(token));
    }, []);

    return (citizens);
} */

/* const ListUserTitles = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(loadUserAsync(token));
    }, []);

    return (user);
} */

const TableBody = (props) => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { families } = useSelector(state => state.families);
    useEffect(() => {
        dispatch(loadFamiliesAsync(token));
    }, []);

    /* if (props.name === "ListFamiliesTitles") {
        name = ListFamiliesTitles();
    } else if (props.name === "ListCitizensTitles") {
        name = ListCitizensTitles();
    } */

    return (
        <tbody>
            {families && families.map((element, index) => {
                return <TableData key={index} {...element} />
            })}
        </tbody>
    );
}

export default TableBody;