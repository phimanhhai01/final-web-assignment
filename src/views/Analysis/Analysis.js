import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import Description from './Description';
import PieChartOccupation from './PieChartOccupation';
import PieChartGender from './PieChartGender';
import BarChartComponent from './BarChart';
import PopulationPyramid from './GenderAnalysis/PopulationPyramid';
import { occupationsDescription, genderDescription } from '../../constants/description/description';
import PopulationLineChart from './LineChart';
import AreaLineChart from './AreaLineChart';
import Filter from '../../components/Filter';
import { Grid } from '@mui/material';
import StatisticComponent from './StatisticComponent';
const ListUser = () => {
    const dispatch = useDispatch();
    console.log(occupationsDescription);
    useEffect(() => {
        dispatch(loadCitizensAsync());
    }, []);
    const styles = {
        root: {
            display: "block",
            width: "100%",
            margin: "0 auto"
        },
        informationChart: {
            display: "flex",
            width: "100"
        },
        firstChart: {
            display: "flex",
            width: "100%",
            gap: "16px"
        },
        secondChart: {
            display: "flex",
            width: "100%",
            height: "32rem",
            marginTop: "1rem",
            gap: "16px"
        },
        age: {
            background: "white",
            width: "50%"
        }
    }

    return (
        <div style={styles.root}>
            {/* <div>
                <h2>Phân tích nhóm tuổi theo nghề  nghiệp</h2>
                <div style={styles.charts}>
                    <PieChartComponent startYear={null} endYear={null} />
                    <PieChartComponent startYear={"1990"} endYear={"1999"} />
                    <PieChartComponent startYear={"2000"} endYear={"2003"} />
                </div>
                <Description width={"50%"} descriptions={occupationsDescription}/>
            </div> */}
            {/* <div>
                <h2>Phân tích nhóm tuổi theo giới tính</h2>
                <div style={styles.charts}>
                    <BarChartComponent year={null} />
                    <BarChartComponent year={"1990"}/>
                    <BarChartComponent year={"2005"}/>
                </div>
                <Description width={"10%"} descriptions={genderDescription}/>
            </div> */}
            <Grid style={{marginBottom: "12px"}} container spacing={2}>
                <Grid item lg={1}>
                    <Filter />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <StatisticComponent title={"Dân số"} number={192783} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticComponent title={"Số Lượng Nam"} number={213456} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticComponent title={"Số Lượng Nữ"} number={345672} />
                </Grid>
            </Grid>
            {/* <div style={styles.firstChart}>
                <PopulationPyramid />
                <PieChartOccupation />
            </div> */}
            <Grid container spacing={2}>
                <Grid item xs={12} lg={7}>
                    <PopulationPyramid />
                </Grid>
                <Grid item xs={12} lg={5}>
                    <PieChartOccupation />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <PopulationLineChart />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <PieChartGender />
                </Grid>
            </Grid>
        </div>
    );
}

export default ListUser;