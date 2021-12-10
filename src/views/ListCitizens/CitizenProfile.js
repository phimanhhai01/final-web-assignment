import React, { useEffect } from 'react';
import { LearningLevels, Ethnics, Religions } from '../../constants/citizen/citizens';
import { useDispatch, useSelector } from 'react-redux';
import { loadCitizenByIdAsync } from '../../redux/reducers/citizens/citizens.thunk';

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const CitizenProfile = (props) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#2E3192",
            },
        },
    });

    const styles = {
        root: {
            width: "45vw",
            height: "65vh",
            marginTop: "8vh",
            background: "white",
            borderRadius: "10px",
            padding: "40px"
        },
        title: {
            fontWeight: "bold",
            fontSize: "25px",
            paddingBottom: "1vh"
        }
    }

    const {id} = props;
    const dispatch = useDispatch();
    const { citizenById } = useSelector(state => state.citizens);
    useEffect(() => {
        dispatch(loadCitizenByIdAsync(id));
    }, []);

    return (
        <div style={styles.root}>
        <ThemeProvider theme={theme}>
          <p style={styles.title}>Thông tin chi tiết</p>
          <Grid container spacing={1} columnSpacing={3}>
            <Grid item xs={4}>
              <TextField   
                defaultValue={citizenById.name}
                margin="dense"
                id="name"
                label="Họ và tên"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={citizenById.dob}
                margin="dense"
                id="name"
                label="Ngày sinh"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={citizenById.id_number}
                margin="dense"
                id="name"
                label="Số CCCD/CMND"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={citizenById.gender}
                margin="dense"
                id="name"
                label="Giới tính"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                
                defaultValue={citizenById.ethnic}
                margin="dense"
                id="name"
                label="Dân tộc"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={citizenById.religion}
                margin="dense"
                id="name"
                label="Tôn giáo"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={citizenById.educational}
                margin="dense"
                id="name"
                label="Trình độ học vấn"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                defaultValue={citizenById.occupations}
                margin="dense"
                id="name"
                label="Nghề nghiệp"
                type="email"
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={citizenById.home_town}
                margin="dense"
                id="name"
                label="Quê quán"
                type="email"
                fullWidth
                multiline
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={citizenById.address_line1}
                margin="dense"
                id="name"
                label="Địa chỉ thường trú"
                type="email"
                fullWidth
                multiline
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={citizenById.address_line2}
                margin="dense"
                id="name"
                label="Địa chỉ tạm trú"
                type="email"
                fullWidth
                multiline
                variant="standard"
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
    </div>
    );
}

export default CitizenProfile;