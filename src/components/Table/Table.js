import React, { useEffect } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
const Table = () => {
    const styles = {
        root: {
            margin: "auto",
            display: "block",
            width: "100%"
        }
    }
    return (
        <table style={styles.root}>
            <TableHead/>
            <TableBody />
        </table>
    );
}

export default Table;