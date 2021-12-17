import React, {useEffect} from 'react';

import Radium from 'radium';

//import filterIcon from "../images/filterIcon.png";
//import { filterBy } from '../constants/filter';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';
import A1Filter from './Filter/A1Filter';
import { useState } from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch } from 'react-redux';
import { loadSubAgenciesAsync } from '../redux/reducers/agencies/agencies.thunk';

const Filter = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadSubAgenciesAsync());
    }, []);
    
    const handleOpen = () => {
        setOpenDialog(true);
    }
    const handleClose = () => {
        setOpenDialog(false);
    }
    const handleConfirmation = () => {
        setOpenDialog(false);
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
                variant="outlined"
                size="large"
                onClick={handleOpen}
            >
               Lọc
            </Button>
            <Dialog onClose={handleClose} open={openDialog}>
                <A1Filter setOpenDialog={setOpenDialog} />
            </Dialog>
        </div>
    );
}

export default Radium(Filter);