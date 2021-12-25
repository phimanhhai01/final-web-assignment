import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import {filterCitizensFunc} from './GenderAnalysis/filterCitizensFunc';
import PieChartSubComponent from "./PieChartComponent/PieChartSubComponent";

const extractCitizens = (citizens, startYear, endYear) => {
    return citizens.filter(element => {
        return element.dob.slice(0,4) >= startYear && element.dob.slice(0,4) <= endYear;
    });
  };
const categorizeCitizensByGender = (citizens) => {
    console.log(citizens)
    let result = [
        {name: "Nam", value: 0},
        {name: "Nữ", value: 0}
    ];
    citizens.forEach(element => {
        if(element.gender === "male"){
            result[0].value++;
        }
        else{
            result[1].value++;
        }
    })
    console.log(result)
    return result;
};
const PieChartGender = (props) => {
  const styles={
    root: { 
    //   height: 300,
      background: "white",
      width: "100%",
      height: "31.3rem",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      marginBottom: '1rem'
    },
    inputStyle: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      padding: "16px"
    },
    title: {
      padding: "1rem"
    }
  }
  const {citizens, filterListAnalysis} = useSelector(state => state.citizens);
  const filteredCitizens = filterListAnalysis.length > 0 ? filterCitizensFunc(citizens, filterListAnalysis) : citizens;
  const rawData = categorizeCitizensByGender(extractCitizens(filteredCitizens, "1990", "1999"));
  const [data, setData] = useState(null);
  const [years, setYears] = useState({startYear: "1990", endYear: "1999"});
  const handleChangeStartYear = (e) => {
    setYears({
      ...years,
      startYear: e.target.value
    });
  }
  const handleChangeEndYear = (e) => {
    setYears({
      ...years,
      endYear: e.target.value
    })
  }
  const handleClick = () => {
    setData(categorizeCitizensByGender(extractCitizens(filteredCitizens, years.startYear, years.endYear)));
  }
  return (
    <div style={styles.root}>
      <h2 style={styles.title}>Nhóm dân số theo giới tính</h2>
      <PieChartSubComponent data={data ? data : rawData} />
      <div style={styles.inputStyle}>
         <TextField style={{width: 100}} size={"small"} onChange={handleChangeStartYear} id="startYear" label="Năm" placeholder="Năm bắt đầu"  variant="outlined" value={years.startYear}/>
         <span>đến</span>
         <TextField style={{width: 100}} size={"small"} onChange={handleChangeEndYear} id="endYear" label="Năm" placeholder="Năm bắt đầu"  variant="outlined" value={years.endYear}/>
         <Button onClick={handleClick} variant="contained">Tra cứu</Button>
       </div>
    </div>
  );
}
export default PieChartGender;
