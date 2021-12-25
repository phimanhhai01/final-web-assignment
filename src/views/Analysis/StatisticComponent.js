import React from 'react';
import {filterCitizensFunc} from './GenderAnalysis/filterCitizensFunc';
import {useSelector} from 'react-redux';
const maleQuantity = (citizens) => {
    return citizens.filter(e => e.gender === "male").length;
}
const StatisticComponent = ({title}) => {
    const {citizens, filterListAnalysis} = useSelector(state => state.citizens);
    const filteredCitizens = filterListAnalysis.length > 0 ? filterCitizensFunc(citizens, filterListAnalysis) : citizens;
    const styles = {
        root: {
            width: "100%",
            background: "white",
            border: "1px solid #e9e4e4",
            borderRadius: "10px",
            marginBottom: "12px"
        },
        title: {
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem",
            color: "#4a3f3f",

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
                <h4>{title}</h4>
                <h4 style={{color: 'rgb(1, 185, 161)'}}>
                    {title === "Số Lượng Nam" && `${(100 * maleQuantity(filteredCitizens)/filteredCitizens.length).toFixed(2)}%`}
                    {title === "Số Lượng Nữ" && `${(100 * (filteredCitizens.length - maleQuantity(filteredCitizens))/filteredCitizens.length).toFixed(2)}%`}
                </h4>
            </div>
            <div style={styles.number}>
                {title === "Dân số" && filteredCitizens.length}
                {title === "Số Lượng Nam" && maleQuantity(filteredCitizens)}
                {title === "Số Lượng Nữ" && filteredCitizens.length - maleQuantity(filteredCitizens)}
            </div>
        </div>
    );
}

export default StatisticComponent;