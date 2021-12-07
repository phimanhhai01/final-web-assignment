import React from 'react';
import Table from '../../components/Table/Table';
import Title from '../../components/Title';

const ListCitizens = () => {
    const styles = {
        root: {
            display: "block",
            background: "white",
            paddingTop: "15vh",
            paddingLeft: "17.36vw"
        }
    }
    return (
        <div style={styles.root}>
            <Title name="Danh sách dân số"/>
            <Table name="ListCitizensTitles"/>
        </div>
    )
}

export default ListCitizens;