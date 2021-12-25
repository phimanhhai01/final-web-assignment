import React from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Legend
} from "recharts";

const rangeData = [
  {
    year: "1960",
    temperature: [
      -1,
      10
    ],
    a: -1,
    b: 10
  },
  {
    year: "1970",
    temperature: [
      2,
      15
    ],
    a: 2,
    b: 15
  },
  {
    year: "1980",
    temperature: [
      3,
      12
    ],
    a: 3,
    b: 12
  },
  {
    year: "1990",
    temperature: [
      4,
      12
    ],
    a: 4,
    b: 12
  },
  {
    year: "2000",
    temperature: [
      12,
      16
    ],
    a: 12,
    b: 16
  },
  {
    year: "2010",
    temperature: [
      5,
      16
    ],
    a: 5,
    b: 16
  },
  {
    year: "2020",
    temperature: [
      3,
      12
    ],
    a: 3,
    b: 12
  },
];

const AreaLineChart = () => {
    const styles = {
        root: {
            width: "50%",
            background: "white",
            borderRadius: "10px",
            marginBottom: "1rem"
        },
        title: {
          margin: "1rem"
        }
    }
    return (
        <div style={styles.root}>
          <h2 style={styles.title}>Tỉ lệ sinh tử</h2>
            <ResponsiveContainer width="100%" height="88%">
                <ComposedChart
                    width={900}
                    height={250}
                    data={rangeData}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Area dataKey="temperature" stroke="#8884d8" fill="#b1bf99" />
                    <Line type="linear" dataKey="a" stroke="#eb4034" strokeWidth={3}/>
                    <Line type="linear" dataKey="b" stroke="#37bf19" strokeWidth={3}/>
                    <Tooltip payload={[{"day": "05-09", a: -3, b: 5}]} />
                    <Legend />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{label}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};


export default AreaLineChart;
