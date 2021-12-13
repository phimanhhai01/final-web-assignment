import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { Navigate, useNavigate } from 'react-router';
import { Ethnics } from "../../constants/citizen/citizens";
import { Religions } from "../../constants/citizen/citizens";
import { LearningLevels } from "../../constants/citizen/citizens";
import { Occupations } from "../../constants/citizen/citizens";
import { HomeTowns } from "../../constants/citizen/citizens";

import { addCitizen } from "../../api/apiCitizens";

const AddCitizen = () => {
  const {currentUser} = useSelector(state => state.user);
  const village_id = currentUser.agency.id;

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
            background: "white",
            borderRadius: "10px",
            padding: "40px"
        },
        title: {
            fontWeight: "bold",
            fontSize: "25px",
            paddingBottom: "1vh"
        },
        marginRight: {
          marginRight: "1vw"
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const dob = dobX.toLocaleDateString('en-CA');
    const educational = formatEducational(learningLevel);
    console.log(educational);
    addCitizen({id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
    navigate(`/list-citizens/`);
  }

  const [name, setName] = useState("");
    
  const handleNameChange = (event) => {
      setName(event.target.value);
  }

  const [id_number, setId_number] = useState("");

  const handleId_numberChange = (event) => {
    setId_number(event.target.value);
  }

  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const [dobX, handleDoBChange] = useState(new Date());

  const [ethnic, setEthnic] = React.useState('');

  const handleEthnicChange = (event) => {
    setEthnic(event.target.value);
  };

  const [religion, setReligion] = React.useState('');

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };

  const [learningLevel, setLearningLevel] = React.useState('');

  const handleLearningLevelChange = (event) => {
    setLearningLevel(event.target.value);
  };

  const [occupations, setOccupation] = React.useState('');

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const [home_town, setHomeTown] = React.useState('');

  const handleHomeTownChange = (event) => {
    setHomeTown(event.target.value);
  };

  const [address_line1, setAddress_line1] = React.useState('');

  const handleAddress_line1Change = (event) => {
    setAddress_line1(event.target.value);
  };

  const [address_line2, setAddress_line2] = React.useState('');

  const handleAddress_line2Change = (event) => {
    setAddress_line2(event.target.value);
  };

    return (
        <div style={styles.root}>
        <ThemeProvider theme={theme}>
          <p style={styles.title}>Khai báo công dân</p>
          <form>
              <TextField   
                margin="dense"
                name="name" 
                value={name}
                label="Họ và tên"
                variant="standard"
                style={styles.marginRight}
                onChange={handleNameChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                defaultValue={null}
                name="dob" 
                style={{marginTop: "8px", marginRight: "1vw"}}
                disableFuture
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
                margin="dense"
                name="id_number" 
                value={id_number}
                label="Số CCCD/CMND"
                variant="standard"
                onChange={handleId_numberChange}
              />
              <FormControl style={{margin: "2vh 0 0 0", width: "100%"}} component="fieldset">
                <FormLabel component="legend" style={{fontSize: "13px"}}>Giới tính</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 120, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Dân tộc</InputLabel>
                <Select
                  name="ethnic"
                  value={ethnic}
                  onChange={handleEthnicChange}
                  label="Dân tộc"
                >
                {
                  Ethnics.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1}} style={{minWidth: 120, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Tôn giáo</InputLabel>
                <Select
                  name="religion"
                  value={religion}
                  onChange={handleReligionChange}
                  label="Tôn giáo"
                >
                {
                  Religions.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 180, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Trình độ học vấn</InputLabel>
                <Select
                  name="educational"
                  value={learningLevel}
                  onChange={handleLearningLevelChange}
                  label="Trình độ học vấn"
                >
                {
                  LearningLevels.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 150, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Nghề nghiệp</InputLabel>
                <Select
                  name="occupations"
                  value={occupations}
                  onChange={handleOccupationChange}
                  label="Nghề nghiệp"
                >
                {
                  Occupations.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 150, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Quê quán</InputLabel>
                <Select
                  name="home_town"
                  value={home_town}
                  onChange={handleHomeTownChange}
                  label="Quê quán"
                >
                {
                  HomeTowns.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <TextField
                style={{ marginTop: "3vh" }}
                name="address_line1"
                value={address_line1}
                onChange={handleAddress_line1Change}
                label="Địa chỉ thường trú"
                fullWidth
                multiline={true}
                variant="standard"
              />
              <TextField
                style={{ marginTop: "3vh"}}
                name="address_line2"
                value={address_line2}
                onChange={handleAddress_line2Change}
                label="Địa chỉ tạm trú"
                fullWidth
                multiline={true}
                variant="standard"
              />
          <div style={{display: "flex", justifyContent: "flex-end", marginTop: "3vh"}}>
            <Button style={{background: "#2E3192", color: "white"}} type="submit" onClick={handleSubmit}>Thêm</Button>
          </div>
          </form>
        </ThemeProvider>
    </div>
    );
}

export default AddCitizen;