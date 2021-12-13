import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCitizenByIdAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { Navigate, useNavigate } from 'react-router';
import TextField from "@mui/material/TextField";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import { Ethnics } from "../../constants/citizen/citizens";
import { Religions } from "../../constants/citizen/citizens";
import { LearningLevels } from "../../constants/citizen/citizens";
import { Occupations } from "../../constants/citizen/citizens";
import { HomeTowns } from "../../constants/citizen/citizens";
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { updateCitizen, deleteCitizen } from "../../api/apiCitizens";

const CitizenProfile = (props) => {
  const {currentUser} = useSelector(state => state.user);
  const village_id = currentUser.agency.id;

  const {id} = props;
  const dispatch = useDispatch();
  const { citizenById } = useSelector(state => state.citizens);
  useEffect(() => {
      dispatch(loadCitizenByIdAsync(id));
  }, []);

  const educational = {
    primary: "Tiểu học",
    secondary: "Trung học cơ sở",
    high: "Trung học phổ thông",
    university: "Cao đẳng / Đại học",
    master: "Sau đại học"
  }

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

    const formatEducational = (learningLevel) => {
      if (learningLevel === "Tiểu học") {
        return "primary";
      } else if (learningLevel === "Trung học cơ sở") {
        return "secondary";
      } else if (learningLevel === "Trung học phổ thông") {
        return "high";
      } else if (learningLevel === "Cao đẳng / Đại học") {
        return "university";
      } else {
        return "master";
      }
    }

    const navigate = useNavigate();

    const handleUpdate = (event) => {
      event.preventDefault();
      const dob = new Date(dobX).toLocaleDateString('en-CA');
      const educational = formatEducational(learningLevel);
      updateCitizen({id,id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
      navigate(`/list-citizens`);
    }

    const handleDelete = () => {
      deleteCitizen(id);
      navigate(`/list-citizens`);
    }

    const [name, setName] = useState(citizenById.name);
    
  const handleNameChange = (event) => {
      setName(event.target.value);
  }

  const [id_number, setId_number] = useState(citizenById.id_number);

  const handleId_numberChange = (event) => {
    setId_number(event.target.value);
  }

  const [gender, setGender] = useState(citizenById.gender);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const [dobX, handleDoBChange] = useState(citizenById.dob);

  const [ethnic, setEthnic] = React.useState(citizenById.ethnic);

  const handleEthnicChange = (event) => {
    setEthnic(event.target.value);
  };

  const [religion, setReligion] = React.useState(citizenById.religion);

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };

  const [learningLevel, setLearningLevel] = React.useState(educational[citizenById.educational]);

  const handleLearningLevelChange = (event) => {
    setLearningLevel(event.target.value);
  };

  const [occupations, setOccupation] = React.useState(citizenById.occupations);

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const [home_town, setHomeTown] = React.useState(citizenById.home_town);

  const handleHomeTownChange = (event) => {
    setHomeTown(event.target.value);
  };

  const [address_line1, setAddress_line1] = React.useState(citizenById.address_line1);

  const handleAddress_line1Change = (event) => {
    setAddress_line1(event.target.value);
  };

  const [address_line2, setAddress_line2] = React.useState(citizenById.address_line2);

  const handleAddress_line2Change = (event) => {
    setAddress_line2(event.target.value);
  };

    return (
        <div style={styles.root}>
        <ThemeProvider theme={theme}>
          <p style={styles.title}>Thông tin chi tiết</p>
          <form>
              <TextField
                style={{ marginRight: "1vw"}}   
                defaultValue={citizenById.name}
                margin="dense"
                id="name"
                label="Họ và tên"
                variant="standard"
                onChange={handleNameChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                name="dob" 
                style={{marginTop: "8px", marginRight: "1vw"}}
                disableFuture
                defaultValue={new Date(citizenById.dob).toLocaleDateString('en-GB')}
                autoOk
                openTo="year"
                format="dd/MM/yyyy"
                label="Ngày sinh"
                views={["year", "month", "date"]}
                value={dobX}
                onChange={handleDoBChange}
              />
              </MuiPickersUtilsProvider>
              <TextField
                style={{ marginRight: "1vw"}}
                defaultValue={citizenById.id_number}
                margin="dense"
                id="name"
                label="Số CCCD/CMND"
                variant="standard"
                onChange={handleId_numberChange}
              />
              <FormControl style={{margin: "2vh 0 0 0", width: "100%"}} component="fieldset">
                <FormLabel component="legend" style={{fontSize: "13px"}}>Giới tính</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" defaultValue={citizenById.gender} onChange={handleGenderChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 120, margin: "1.5vh 1vw 0 0"}}>
                <InputLabel >Dân tộc</InputLabel>
                <Select
                  name="ethnic"
                  defaultValue={citizenById.ethnic}
                  label="Dân tộc"
                  onChange={handleEthnicChange}
                >
                {
                  Ethnics.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1}} style={{minWidth: 120, margin: "1.5vh 1vw 0 0"}}>
                <InputLabel >Tôn giáo</InputLabel>
                <Select
                  name="religion"
                  defaultValue={citizenById.religion}
                  label="Tôn giáo"
                  onChange={handleReligionChange}
                >
                {
                  Religions.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 180, margin: "1.5vh 1vw 0 0"}}>
                <InputLabel >Trình độ học vấn</InputLabel>
                <Select
                  name="educational"
                  defaultValue={educational[citizenById.educational]}
                  label="Trình độ học vấn"
                  onChange={handleLearningLevelChange}
                >
                {
                  LearningLevels.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 150, margin: "1.5vh 1vw 0 0"}}>
                <InputLabel >Nghề nghiệp</InputLabel>
                <Select
                  name="occupations"
                  defaultValue={citizenById.occupations}
                  label="Nghề nghiệp"
                  onChange={handleOccupationChange}
                >
                {
                  Occupations.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 150, margin: "1.5vh 1vw 0 0"}}>
                <InputLabel >Quê quán</InputLabel>
                <Select
                  name="home_town"
                  defaultValue={citizenById.home_town}
                  label="Quê quán"
                  onChange={handleHomeTownChange}
                >
                {
                  HomeTowns.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <TextField
                style={{ marginTop: "3vh" }}
                defaultValue={citizenById.address_line1}
                margin="dense"
                id="name"
                label="Địa chỉ thường trú"
                fullWidth
                multiline
                variant="standard"
                onChange={handleAddress_line1Change}
              />
              <TextField
                style={{ marginTop: "3vh" }}
                defaultValue={citizenById.address_line2}
                margin="dense"
                id="name"
                label="Địa chỉ tạm trú"
                fullWidth
                multiline
                variant="standard"
                onChange={handleAddress_line2Change}
              />
              <div style={{display: "flex", justifyContent: "flex-end", marginTop: "3vh"}}>
                <Button style={{marginRight: "10px", background: "lightgrey"}} onClick={handleDelete} type="button">Xóa</Button>
                <Button style={{background: "#2E3192", color: "white"}} onClick={handleUpdate} type="button">Cập nhật</Button>
              </div>
          </form>
        </ThemeProvider>
    </div>
    );
}

export default CitizenProfile;