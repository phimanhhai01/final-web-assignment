import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import A1Filter from '../../components/Filter/A1Filter';
import A2Filter from '../../components/Filter/A2Filter';
import A3Filter from '../../components/Filter/A3Filter';
import { useSelector } from 'react-redux';
const ListCitizens = () => {
    const styles = {
        root: {
            width: "60%",
            margin: "auto",
            background: "white",
        }
    };
    const { currentUser } = useSelector(state => state.user);

    return (
        <div style={styles.root}>
            {currentUser.level === "1" && <A1Filter />}
            {currentUser.level === "2" && <A2Filter />}
            {currentUser.level === "3" && <A3Filter />}
            <Table />
        </div>
    )
}

export default ListCitizens;