import React, { useEffect } from 'react';
// import TableHead from './TableHead';
// import TableBody from './TableBody';
import Filter from '../../components/Filter';
import SearchBar from '../../components/SearchBar';
import style from './table.css';


const Table = (props) => {
    const {heads, data, renderData} = props;

    const styles = {
        root: {
            width: "100%",
            borderTop: "black 1px solid",
            borderCollapse: "collapse",
        },
        searchEngine: {
            display: "flex",
            margin: "0.5rem"
        }
    }
    return (
        <div>
            <div style={styles.searchEngine}>
                <Filter/>
                <SearchBar/>
            </div>
            <table className="table">
                {/* <TableHead name={props.name}/> */}
                <thead className="table__head">
                    <tr>
                    {
                        heads.map((item, index) => <th key={index}>{item}</th>)
                    }
                    </tr>
                </thead>
                <tbody className="table__body">
                    {
                        data.map((item, index) => renderData(item, index))
                    }
                </tbody>
                {/* <TableBody name={props.name}/> */}
            </table>
        </div>

    );
}

export default Table;