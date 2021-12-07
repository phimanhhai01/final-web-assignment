import React from 'react';
import CitizenProfile from '../../views/ListCitizens/CitizenProfile';

const ListUser = () => {
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
            <CitizenProfile/>
        </div>
    )
}

export default ListUser;