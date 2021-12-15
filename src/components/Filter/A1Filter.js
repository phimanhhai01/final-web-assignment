import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FilterComponent from './Checkboxes';
import {useSelector} from 'react-redux';


const A1Filter = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { currentUser } = useSelector(state => state.user);

    
    return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <FilterComponent />
        </TabPanel>
        <TabPanel value="2">
            <FilterComponent />
        </TabPanel>
        <TabPanel value="3">
            <FilterComponent />
        </TabPanel>
      </TabContext>
    </Box>
    );
}

export default A1Filter;