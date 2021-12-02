import React from 'react';
import Table from '../../components/Table/Table';

const ListCitizens = () => {
    const styles = {
        root: {
            width: "60%",
            margin: "auto",
            background: "white",
        }
    }
    return (
        <div style={styles.root}>
            <Table />
        </div>
    )
}

export default ListCitizens;