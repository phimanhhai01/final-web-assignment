import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import PieChartSubComponent from "./PieChartComponent/PieChartSubComponent";

const extractCitizens = (citizens, startYear, endYear) => {
  return citizens.filter(element => {
      return element.dob.slice(0,4) >= startYear && element.dob.slice(0,4) <= endYear;
  });
};

const categorizeCitizensByOccupation = (citizens) => {
  let result = [
      { name: "Học Sinh", value: 0 },
      { name: "Công Chức", value: 0 },
      { name: "Nông Dân", value: 0 },
      { name: "Khác", value: 0 }
    ];
  citizens.forEach(element => {
      let exist = false;
      for(let i = 0 ; i<result.length - 1 ; i++){
          if(result[i].name === element.occupations){
              result[i].value++;
              exist = true;
          }
      }
      if(!exist){
          result[result.length - 1].value++;
      }
  });
  return result;
}
const PieChartOccupation = (props) => {
  const styles={
    root: {
      height: 300,
      background: "white",
      width: "100%",
      height: "39.3rem",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px"
    },
    inputStyle: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      padding: "12px"
    },
    title: {
      padding: "1rem"
    }
  }
  const {citizens} = useSelector(state => state.citizens);
  const rawData = categorizeCitizensByOccupation(extractCitizens(citizens, "1990", "1999"));
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
    setData(categorizeCitizensByOccupation(extractCitizens(citizens, years.startYear, years.endYear)));
  }
  return (
    <div style={styles.root}>
      <h2 style={styles.title}>Nhóm dân số theo ngành</h2>
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
export default PieChartOccupation;
