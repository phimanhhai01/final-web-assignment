import React, {useState} from 'react';
import CitizenProfile from '../../views/ListCitizens/CitizenProfile';
import { Dialog, withStyles } from '@material-ui/core';
const styles= {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh",
    }
};

const Profile = ({classes, props, open, handleCloseFather}) => {

    const [openChild, setOpenChild] = useState(open);
    const handleClose = () => {
        setOpenChild(false);
    }
    return (
        <Dialog
            open={open}
            maxWidth={'xl'}
            onClose={handleClose}
            classes={{paper: classes.dialogPaper}}
        >
            <button onClick={handleClose}>Close</button>
            <CitizenProfile props={props}/>
        </Dialog>
    );
}

export default withStyles(styles)(Profile);