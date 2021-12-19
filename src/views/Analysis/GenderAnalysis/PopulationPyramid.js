import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { groupAge } from '../../../constants/analysis/analysis';

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const PopulationPyramid = () => {
    const [year, setYear] = useState("2021");
    const { citizens } = useSelector(state => state.citizens);
    const data = caculateMaleData(citizens, "2021");
    const styles={
        root: {
            display: "flex",
            alignItems: "flex-end",
            width: "60%",
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
            marginBottom: "3rem",
            gap: "0.37rem",
            justifyContent: "space-around",
            fontSize: "1.03rem",
        },
        li: {
            width: "4.5rem",
            textAlign: "end"
        }
    }
    return (
    <div style={styles.root}>
        <div style={styles.chart}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    width={"20%"}
                    height={500}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 50
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis orientation="bottom" type="number" reversed domain={[0, getMaxQuantity(data)]}/>
                    <YAxis tick={false} mirror={true} orientation="right" dataKey="name" type="category" scale="band" />
                    <Tooltip />
                    <Bar layout="vertical" dataKey="male" barSize={20} fill="#446080" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div style={styles.groupAge}>
            {groupAge.map((element, i) => {
                return <div style={styles.li} key={i}>{element}</div>
            })}
        </div>
        <div style={styles.chart}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    width={500}
                    height={500}
                    data={caculateMaleData(citizens, "2021")}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 50
                    }}
                    >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis orientation="bottom" type="number" domain={[0, getMaxQuantity(data)]}/>
                    <Tooltip />
                    <YAxis tick={false} mirror={true} dataKey="name" type="category" scale="band" />
                    <Bar layout="vertical" dataKey="female" barSize={20} fill="#db5858" />
                </BarChart>
            </ResponsiveContainer>
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
const caculateMaleData = (citizens, year) => {
    let result = [];
    for (let i = 0 ; i<90 ; i=i + 5){
        let element = extractCitizensByAge(citizens, i, i+4, year);
        result.push(element);
    }
    result = result.reverse();
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