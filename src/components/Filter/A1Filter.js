import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FilterComponent from './Checkboxes';
import { useSelector } from 'react-redux';

const A1Filter = ({setOpen}) => {
    const { currentUser } = useSelector(state => state.user);
    const [value, setValue] = React.useState('1');
    const { subAgencies } = useSelector(state => state.agencies);
    const { filterList } = useSelector(state => state.citizens);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    if(currentUser.level == "1"){
      return (
        <div style={{background: "white"}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Chọn Theo Huyện" value="1" />
                <Tab label="Chọn Theo Xã" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
                <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 4) ? filterList : []} setOpen={setOpen} data={subAgencies[0]} />
            </TabPanel>
            <TabPanel value="2">
                <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 6) ? filterList : []} setOpen={setOpen} data={subAgencies[1]} />
            </TabPanel>
          </TabContext>
        </div>
      );
    }
    if(currentUser.level == "2"){
      return (
        <div sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Chọn Theo Xã" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
                <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 6) ? filterList : []} setOpen={setOpen} data={subAgencies[0]} />
            </TabPanel>
          </TabContext>
        </div>
      );
    }

    if(currentUser.level == "3"){
      return (
        <div sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Chọn Theo Thôn" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
                <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 8) ? filterList : []} setOpen={setOpen} data={subAgencies[0]}/>
            </TabPanel>
          </TabContext>
        </div>
      )
    }
    return (
    <div sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Chọn Theo Tỉnh" value="1" />
            <Tab label="Chọn Theo Huyện" value="2" />
            <Tab label="Chọn Theo Xã" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 2) ? filterList : []} setOpen={setOpen} data={subAgencies[0]}/>
        </TabPanel>
        <TabPanel value="2">
            <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 4) ? filterList : []} setOpen={setOpen} data={subAgencies[1]}/>
        </TabPanel>
        <TabPanel value="3">
            <FilterComponent filterList={(filterList.length > 0 && filterList[0].id.length === 6) ? filterList : []} setOpen={setOpen} data={subAgencies[2]}/>
        </TabPanel>
      </TabContext>
    </div>
    );
}

export default A1Filter;