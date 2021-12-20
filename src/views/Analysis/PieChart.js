import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, TextField } from "@mui/material";

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartComponent = (props) => {
  const styles={
    root: {
      width:"33.33%", 
      height: 300,
      background: "white",
      marginLeft: "12px",
      width: "40%",
      height: "32rem",
      display: "flex",
      flexDirection: "column"
    }
  }
  const {citizens} = useSelector(state => state.citizens);
  const dataRaw = categorizeCitizensByOccupation(extractCitizens(citizens, props.startYear, props.endYear));
  const [data, setData] = useState([]);
  const [years, setYears] = useState({startYear: null, endYear: null});
  const handleChangeStartYear = (e) => {
    setYears({
      ...years,
      startYear: e.target.value
    })
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
  useEffect(() => {
    setData(categorizeCitizensByOccupation(extractCitizens(citizens, props.startYear, props.endYear)));
    console.log(data);
  }, [])
  return (
    <div style={styles.root}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataRaw}
            cx="50%"
            cy="50%"
            labelLine={true}
            label
            outerRadius={"80%"}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        
      </ResponsiveContainer>
      {(props.startYear && props.endYear)
       ? <p style={{textAlign: "center"}}>Cư dân sinh từ năm {props.startYear} đến năm {props.endYear}</p>
       : <div style={{textAlign: "center"}}>
         <TextField style={{width: 100, height: 10}} onChange={handleChangeStartYear} id="startYear" label="Năm" placeholder="Năm bắt đầu"  variant="outlined" value={years.startYear}/>
         <span>đến</span>
         <TextField style={{width: 100, height: 10}} onChange={handleChangeEndYear} id="endYear" label="Năm" placeholder="Năm bắt đầu"  variant="outlined" value={years.endYear}/>
         <Button onClick={handleClick} variant="contained">Tra cứu</Button>
       </div>
      }
    </div>
  );
}
export default PieChartComponent;
