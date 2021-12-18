import React, {useEffect} from 'react';

import Radium from 'radium';

//import filterIcon from "../images/filterIcon.png";
//import { filterBy } from '../constants/filter';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';
import FilterBox from './Filter/FilterBox';
import { useState } from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch } from 'react-redux';
import { loadSubAgenciesAsync } from '../redux/reducers/agencies/agencies.thunk';
import { Popper } from '@material-ui/core';

const Filter = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadSubAgenciesAsync());
    }, []);
    
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const styles = {
        root: {
            // display: "flex",
            // width: "9vw",
            // height: "5vh",
            // background: "#2E3192",
            // borderRadius: "10px",
            // justifyContent: "center",
            // alignItems: "center",
            // margin: "0.5rem",
            // ':hover': {
            //     cursor: "pointer",
            // },
        },
        icon: {
            marginLeft: "0.5rem",
            height: "3vh",
            color: "white",
        },
        filter: {
            padding: "0.5rem",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            appearance: "none",
        },
        listMenu: {
            display: "none",
            position: "absolute",
            top: "calc(100% + 7px)",
            background: "#FFFFFF",
            padding: "0",
            listStyleType: "none",
            width: "160px",
            ':hover': {
                display: "block",
            }
        },
        listItem: {

        }
    }
    return (
        <div key={1} style={styles.root}>
            <Button 
                variant="contained"
                size="large"
                onClick={handleOpen}
            >
               Lọc
            </Button>
            <Popper style={{zIndex: 99, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} anchorEl={anchorEl} placement="bottom-start" onClose={handleClose} open={open}>
                <FilterBox setOpen={setOpen} />
            </Popper>
        </div>
    );
}

export default Radium(Filter);