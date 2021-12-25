import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useSelector } from "react-redux";
const data = [
  {
    year: "1980",
    population: 1000
  },
  {
    year: "1990",
    population: 1300
  },
  {
    year: "2000",
    population: 2000
  },
  {
    year: "2010",
    population: 2500
  },
  {
    year: "2020",
    population: 3000
  },
  
];

const extractData = (citizens) => {
    let result = [];
    const getPopulation = (citizens, year) => {
        let population = 0;
        for(let i = 0 ; i<citizens.length ; i++){
            citizens[i].dob.slice(0, 4) <= year && population++;
        }
        return {
            year: year,
            population: population
        };
    }
    for (let i = 1960 ; i<2030 ; i = i + 10){
        const a = getPopulation(citizens, i);
        result.push(a);
    }
    return result;
}

const PopulationLineChart = () => {
    const styles={
        root:{
          width: "100%",
          height: 500,
          minHeight: "100%",
          background: "white",
          borderRadius: "10px",
          // marginBottom: "1rem"
        },
        title: {
          padding: "1rem"
        }
    }
    const {citizens} = useSelector(state => state.citizens);
    console.log(extractData(citizens));

    return (
        <div style={styles.root}>
          <div style={styles.title}>
            <h2>Tình hình gia tăng dân số của vùng</h2>
          </div>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    width={600}
                    height={400}
                    data={extractData(citizens)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis name="Năm" dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="linear"
                        dataKey="population"
                        stroke="#8884d8"
                        strokeWidth={3}
                        activeDot={{ r: 10 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PopulationLineChart;
