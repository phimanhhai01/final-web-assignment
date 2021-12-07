import React from 'react';
import Table from '../../components/Table/Table';

const ListUser = () => {
    const styles = {
        root: {
            /* width: "60%", */
            display: "block",
            background: "white",
            paddingTop: "15vh",
            paddingLeft: "17.36vw"
        }
    }
    return (
        <div style={styles.root}>
            <Table name="ListUserTitles" />
        </div>
    )
}

export default ListUser;