import React from 'react'
import AgencyForm from './AgencyForm'
const styles = {
   
    header: {
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
};

const AddAgency = () => {
    return (
        <div className="page-limit">
            <div style={styles.header}>
                <h2>Thêm đơn vị mới</h2>
                <div></div>
                
            </div>
            <AgencyForm />
            {/* Chinh vuong */}
        </div>

    )
}
export default AddAgency
