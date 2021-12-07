import React,{useEffect} from 'react';
import TableData from './TableData';
import { useSelector, useDispatch } from 'react-redux';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';

const TableBody = () => {
    const { citizens } = useSelector(state => state.citizens);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCitizensAsync());
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