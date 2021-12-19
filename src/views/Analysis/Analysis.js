import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCitizensAsync } from '../../redux/reducers/citizens/citizens.thunk';
import Description from './Description';
import PieChartComponent from './PieChart';
import BarChartComponent from './BarChart';
import PopulationPyramid from './GenderAnalysis/PopulationPyramid';
import { occupationsDescription, genderDescription } from '../../constants/description/description';
const ListUser = () => {
    const dispatch = useDispatch();
    console.log(occupationsDescription);
    useEffect(() => {
        dispatch(loadCitizensAsync());
    }, []);
    const styles = {
        root: {
            display: "flex"
        },
        firstChart: {
            
        },
        charts: {
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row"
        },
        age: {
            background: "white",
            width: "70%"
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
            
        
            <PopulationPyramid />
            <PieChartComponent startYear={"1990"} endYear={"1999"} />
        </div>
    );
}

export default ListUser;