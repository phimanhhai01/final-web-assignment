import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  ArgumentScale,
  ValueScale,
} from '@devexpress/dx-react-chart';
import { scaleBand } from 'd3-scale';
import { withStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import {filterCitizensFunc} from './filterCitizensFunc';


const legendStyles = {
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
};
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
  },
});
const legendItemStyles = {
  item: {
    flexDirection: 'column',
  },
};

const LegendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const LegendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label {...restProps} className={classes.label} />
);
const LegendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item {...restProps} className={classes.item} />
);
const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);
const LegendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(LegendLabelBase);
const LegendItem = withStyles(legendItemStyles, { name: 'LegendItem' })(LegendItemBase);

const Label = ({ text, ...props }) => (
  <ValueAxis.Label {...props} text={`${Math.abs(text)}%`} />
);
const modifyDomain = ([start, end]) => {
  const threshold = Math.ceil(Math.max(Math.abs(start), Math.abs(end)));
  return [-threshold, threshold];
};
class NewPyramid extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            year: "2019",
        };
    }
    
    componentDidMount(){
        const { citizens, filterListAnalysis } = this.props;
        const result = filterListAnalysis.length > 0 
        ? this.caculateData(this.filterCitizensFunc(citizens, filterListAnalysis), this.state.year) 
        : this.caculateData(citizens, this.state.year);
        this.setState({
            ...this.state,
            data: [...result]
        });
    }
    componentDidUpdate(prevProps){
        if(prevProps.citizens != this.props.citizens || prevProps.filterListAnalysis != this.props.filterListAnalysis){
            const result = this.props.filterListAnalysis.length > 0 
            ? this.caculateData(this.filterCitizensFunc(this.props.citizens, this.props.filterListAnalysis), this.state.year) 
            : this.caculateData(this.props.citizens, this.state.year);
            this.setState({
            ...this.state,
            data: [...result]
        });
        }
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            year: e.target.value
        })
    }

    handleClick = () => {
        const { citizens, filterListAnalysis } = this.props;
        const result = filterListAnalysis.length > 0 
        ? this.caculateData(this.filterCitizensFunc(citizens, filterListAnalysis), this.state.year) 
        : this.caculateData(citizens, this.state.year);
        this.setState({
            ...this.state,
            data: [...result]
        });
    }

    extractCitizensByAge = (citizens, from, to, year) => {
        let a =  citizens.filter(element => {
            return year - element.dob.slice(0,4) >= from && year - element.dob.slice(0, 4) <= to;  
        });
        let countBoys = 0;
        let countGirls = 0;
        a.forEach(element => {
            element.gender === "male" ? countBoys++ : countGirls++; 
        })
        return {
            age: `${from}-${to}`,
            male: countBoys*-1/5,
            female: countGirls/5
        }
    }
    caculateData = (citizens, year) => {
        let result = [];
        for (let i = 0 ; i<90 ; i=i + 5){
            let element = this.extractCitizensByAge(citizens, i, i+4, year);
            result.push(element);
        }
        return result;
    }
    filterCitizensFunc = (citizens, filterListAnalysis) => {
        let filteredCitizens = [];
            let filterListId = filterListAnalysis.map(e => e.id);
            filteredCitizens = citizens.filter(e => {
                for(let i = 0 ; i<filterListId.length ; i++){
                    if(e.village_id.search(filterListId[i]) !== -1){
                        return true;
                    }
                }
            });
        return filteredCitizens;
    }

    render() {
        const { data, year } = this.state;

        return (
        <div>
                <Paper style={{height: "567px"}}>
                    <Chart
                    style={{height: "100%"}}
                    data={data}
                    rotated
                    >
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueScale modifyDomain={modifyDomain} />

                    <BarSeries
                        name="Nam"
                        valueField="male"
                        argumentField="age"
                        color="#3F7FBF"
                    />
                    <BarSeries
                        name="Nữ"
                        valueField="female"
                        argumentField="age"
                        color="#F87CCC"
                    />
                    <Title text="Tháp dân số" />
                    <Animation />
                    <Legend
                        position="bottom"
                        rootComponent={LegendRoot}
                        itemComponent={LegendItem}
                        labelComponent={LegendLabel}
                    />
                    </Chart>
                </Paper>
                <div style={styles.year}>
                    <TextField id="standard-basic" label="Nhập năm" variant="outlined" size={"small"} onChange={this.handleChange} value={year} />
                    <Button onClick={this.handleClick} variant="contained">Phân tích</Button>
                </div>
        </div>
    );
  }
}
const mapStatesToProps = (state) => {
    return { 
        citizens: state.citizens.citizens,
        filterListAnalysis: state.citizens.filterListAnalysis
    };
}
export default connect(mapStatesToProps, null)(NewPyramid);
const styles = {
    year: {
        display: "flex",
        justifyContent: "center",
        background: "white",
        gap: "1rem",
        paddingBottom: "1rem",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
    }
}
const data = [{
    age: '0-4',
    male: -4.9,
    female: 4.3,
  }, {
    age: '5-9',
    male: -4.4,
    female: 4.2,
  }, {
    age: '10-14',
    male: -4.2,
    female: 4.0,
  }, {
    age: '15-19',
    male: -4.0,
    female: 3.8,
  }, {
    age: '20-24',
    male: -3.9,
    female: 3.7,
  }, {
    age: '25-29',
    male: -4.0,
    female: 3.8,
  }, {
    age: '30-34',
    male: -4.0,
    female: 3.8,
  }, {
    age: '35-39',
    male: -3.5,
    female: 3.4,
  }, {
    age: '40-44',
    male: -3.2,
    female: 3.1,
  }, {
    age: '45-49',
    male: -3.1,
    female: 3.1,
  }, {
    age: '50-54',
    male: -2.8,
    female: 2.8,
  }, {
    age: '55-59',
    male: -2.4,
    female: 2.5,
  }, {
    age: '60-64',
    male: -2.0,
    female: 2.1,
  }, {
    age: '65-69',
    male: -1.6,
    female: 1.8,
  }, {
    age: '70-74',
    male: -1.1,
    female: 1.2,
  }, {
    age: '75-79',
    male: -0.7,
    female: 0.9,
  }, {
    age: '80-84',
    male: -0.4,
    female: 0.6,
  }, {
    age: '85-89',
    male: -0.2,
    female: 0.3,
  }, {
    age: '90+',
    male: -0.1,
    female: 0.1,
  }];