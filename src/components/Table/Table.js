import React, { useEffect } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Filter from '../../components/Filter';
import SearchBar from '../../components/SearchBar';

const Table = (props) => {
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
            <table style={styles.root}>
                <TableHead name={props.name}/>
                <TableBody name={props.name}/>
            </table>
        </div>

    );
}

export default Table;