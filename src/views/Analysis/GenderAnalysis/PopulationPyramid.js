import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { groupAge } from '../../../constants/analysis/analysis';
import Button from '@mui/material/Button';
//import Button from "../../../components/Button/Button";
import TextField from '@mui/material/TextField';
import {filterCitizensFunc} from './filterCitizensFunc'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
const PopulationPyramid = () => {
    const { citizens, filterListAnalysis } = useSelector(state => state.citizens);
    const rawData = filterListAnalysis.length > 0 ? caculateData(filterCitizensFunc(citizens, filterListAnalysis), "2021") : caculateData(citizens, "2021");
    const [year, setYear] = useState("2021");
    const [data, setData] = useState(null);
    const styles={
        root: {
            width: "100%",
            boxSizing: "border-box",
        },
        pyramid: {
            display: "flex",
            alignItems: "flex-end",
            background: "white",
            flexWrap: "nowrap"
        },
        chart: {
            width: "45%",
            height: "32rem"
        },
        groupAge: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "2.2rem",
            gap: "0.28rem",
            justifyContent: "space-around",
            fontSize: "1.03rem",
        },
        li: {
            width: "4.5rem",
            textAlign: "end",
            color: "#9199a8"
        },
        title: {
            background: "white",
            padding: "1rem",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px"
        },
        year: {
            display: "flex",
            justifyContent: "center",
            background: "white",
            gap: "1rem",
            paddingBottom: "1rem",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px"
        },
        ageStyle:{
            textAlign: "end",
            marginRight: "-6px",
            marginTop: "12px"
        }
    }
    const handleChange = (e) => {
        setYear(e.target.value);
    }
    const handleClick = () =>{
        filterListAnalysis.length > 0 ? caculateData(filterCitizensFunc(citizens, filterListAnalysis), year) : caculateData(citizens, year);
    }
    return (
        <div style={styles.root}>
            <h2 style={styles.title}>Tháp dân số</h2>
            <div style={styles.pyramid}>
                <div style={styles.chart}>
                    <ResponsiveContainer>
                        <BarChart
                            layout="vertical"
                            width={"20%"}
                            height={500}
                            data={data ? data : rawData}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 50
                            }}
                        >
                            <CartesianGrid strokeDasharray="2" stroke="#8c919c" />
                            <XAxis orientation="bottom" type="number" reversed domain={[0, getMaxQuantity(data ? data : rawData)]}/>
                            <YAxis tick={false} mirror={true} orientation="right" dataKey="name" type="category" scale="band" />
                            <Tooltip />
                            <Bar layout="vertical" dataKey="male" barSize={20} fill="#446080" />
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={styles.groupAge}>
                    {groupAge.map((element, i) => {
                        return <div style={styles.li} key={i}>{element}</div>
                    })}
                    <p style={styles.ageStyle}>Độ Tuổi</p>
                </div>
                <div style={styles.chart}>
                    <ResponsiveContainer>
                        <BarChart
                            layout="vertical"
                            width={500}
                            height={500}
                            data={data ? data : rawData}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 50
                            }}
                            >
                            <CartesianGrid strokeDasharray="2" stroke="#8c919c" />
                            <XAxis orientation="bottom" type="number" domain={[0, getMaxQuantity(data ? data : rawData)]}/>
                            <Tooltip />
                            <YAxis tick={false} mirror={true} dataKey="name" type="category" scale="band" />
                            <Bar layout="vertical" dataKey="female" barSize={20} fill="#db5858" />
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div style={styles.year}>
                <TextField id="standard-basic" label="Nhập năm" variant="outlined" size={"small"} onChange={handleChange} value={year} />
                <Button onClick={handleClick} variant="contained">Phân tích</Button>
            </div>
        </div>
    );
  }
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
        name: `${from}-${to}`,
        male: countBoys,
        female: countGirls
    }
}
const caculateData = (citizens, year) => {
    let result = [];
    for (let i = 0 ; i<90 ; i=i + 5){
        let element = extractCitizensByAge(citizens, i, i+4, year);
        result.push(element);
    }
    result = result.reverse();
    console.log(result);
    return result;
}
const getMaxQuantity = (arrayData) => {
    let maleArray = [];
    let femaleArray = [];
    arrayData.forEach(element => {
        maleArray.push(element.male);
        femaleArray.push(element.female);
    })
    return Math.max(...maleArray) > Math.max(...femaleArray) ? Math.max(...maleArray) : Math.max(...femaleArray);
}
export default PopulationPyramid;