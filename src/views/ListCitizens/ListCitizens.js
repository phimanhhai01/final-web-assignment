import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Title from '../../components/Title';

import A1Filter from '../../components/Filter/A1Filter';
import { useSelector } from 'react-redux';
const ListCitizens = () => {
    const styles = {
        root: {
            display: "block",
            background: "white",
            paddingTop: "15vh",
            paddingLeft: "17.36vw"
        }
    };
    const { currentUser } = useSelector(state => state.user);

    return (
        <div style={styles.root}>
            <Title name="Danh sách dân số"/>
            <Table name="ListCitizensTitles"/>
            {/* {currentUser.level === "1" && <A1Filter />}
            <Table /> */}
        </div>
    )
}

export default ListCitizens;