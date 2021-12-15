import React, { useEffect } from 'react';
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
            alignItems: "center",
            borderBottom: "1px solid var(--border-color)",
            padding: "0.5rem"
        }, 
        searchBarWapper: {
            flexGrow: 1
        }
    }
    return (
        <div>
            <div style={styles.searchEngine}>
                <div>
                    <Filter/>
                </div>
                <div style={styles.searchBarWapper}>
                    <SearchBar/>
                </div>
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
                       data? data.map((item, index) => renderData(item, index)):null
                    }
                </tbody>
                {/* <TableBody name={props.name}/> */}
            </table>
        </div>

    );
}

export default Table;