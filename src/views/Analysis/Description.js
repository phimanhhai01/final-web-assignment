import React from 'react';


const Description = (props) => {
    const { descriptions, width } = props;
    let styles = {
        root: {
            display: "flex",
            justifyContent: "space-around",
            width: width,
            margin: "2rem auto 0 auto"
        },
        colorField: {
            display: "flex"
        }
    }
    return (
        <div style={styles.root}>
            {descriptions.map((element, key) => 
            <div style={styles.colorField} id={key}>
                <div style={element.style()}></div>
                <span>{element.name}</span>
            </div>)}
        </div>
    );
}

export default Description;
