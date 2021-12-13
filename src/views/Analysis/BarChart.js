import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// const data = [
//   {
//     name: "Từ 0 đến 5 tuổi",
//     male: 4000,
//     female: 2400,
//   },
//   {
//     name: "Từ 0 đến 5 tuổi",
//     male: 3000,
//     female: 1398,
//   },
//   {
//     name: "Từ 0 đến 5 tuổi",
//     male: 2000,
//     female: 4000,
//   },
// ];

const extractCitizensByAge = (citizens, from, to, year) => {
    let a =  citizens.filter(element => {
        return year - element.dob.slice(0,4) >= from && year - element.dob.slice(0, 4) <= to;  
    });
    let countBoys = 0;
    let countGirls = 0;
    a.forEach(element => {
        element.gender === "male" ? countBoys++ : countGirls++; 
    })
    return {
        name: `Từ ${from} đến ${to} tuổi`,
        male: countBoys,
        female: countGirls
    }
}
const caculateData = (citizens, year) => {
    let result = [];
    for (let i = 0 ; i<15 ; i=i + 5){
        let element = extractCitizensByAge(citizens, i, i+4, year);
        result.push(element);
    }
    console.log(result);
    return result;
}


const BarChartComponent = (props) => {
    const styles = {
        root: {},
        text: {
            textAlign: "center"
        }
    }
    const {citizens} = useSelector(state => state.citizens);
    const [data, setData] = useState([]);
    const [year, setYear] = useState("");
    const handleChange = (e) => {
        setYear(e.target.value);
    }
    const handleClick = () => {
        setData(caculateData(citizens, year));
    }
    useEffect(() => {
        setData(caculateData(citizens, props.year))
    }, [citizens])
    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="male" fill="#8884d8" />
                <Bar dataKey="female" fill="#82ca9d" />
            </BarChart>
            {props.year ? <p style={styles.text}>Năm {props.year}</p> : 
            <div style={styles.text}>
                <TextField onChange={handleChange} id="outlined-basic" label="Năm" placeholder="Nhập năm muốn thống kê"  variant="outlined" value={year}/>
                <Button onClick={handleClick} variant="contained">Tra cứu</Button>
            </div>}

        </div>
    );
}
export default BarChartComponent;