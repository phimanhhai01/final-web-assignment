import React from 'react';

const StatisticComponent = (props) => {
    const styles = {
        root: {
            width: "100%",
            background: "white",
            border: "1px solid #e9e4e4",
            borderRadius: "10px",
            marginBottom: "12px"
        },
        title: {
            margin: "1rem",
            color: "#4a3f3f"
        },
        number: {
            fontSize: "40px",
            textAlign: 'center',
            color: "#4a3f3f",
            margin: "2rem 0"
        }
    }
    return (
        <div style={styles.root}>
            <div style={styles.title}>
                <h4>{props.title}</h4>
            </div>
            <div style={styles.number}>
                {props.number}
            </div>
        </div>
    );
}

export default StatisticComponent;