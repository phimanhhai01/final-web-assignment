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
    if (nameX.value === "") {
      console.log("Enter nameX");
      handleNameChange(event);
    }
    if (id_numberX.value === "") {
      console.log("Enter id_numberX");
      handleId_numberChange(event);
    }
    if (address_line1X.value === "") {
      console.log("Enter add1");
      handleAddress_line1Change(event);
    }
    if (address_line2X.value === "") {
      console.log("Enter add2");
      handleAddress_line2Change(event);
    }
    console.log("Here");
    // console.log(id,id_numberX,nameX,dobX,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1X,address_line2X);
    if (nameX.error === "" && id_numberX.error === "" && address_line1X.error === "" && address_line2X.error === "") {
      const dob = dobX.toLocaleDateString('en-CA');
      const educational = formatEducational(learningLevel);
      const name = nameX.value;
      const id_number = id_numberX.value;
      const address_line1 = address_line1X.value;
      const address_line2 = address_line2X.value;
      updateCitizen({id,id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
      navigate(`/list-citizens/`);
    }
  }

  const handleDelete = () => {
    deleteCitizen(id);
    navigate(`/list-citizens`);
  }
    
  const containUpperCase = (word) => {
    if (/[ÁÀÃẢẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÔỐỒỔỖỘƠỚỜỞỠỢÓÒÕỎỌƯỨỪỬỮỰÚÙỦŨỤÝỲỶỸỴA-Z]/.test(word)) {
      return true;
    } else {
      return false;
    }
  }
  const containLowerCase = (word) => {
    if (/[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]/.test(word)) {
      return true;
    } else {
      return false;
    }
  }
  const containSpecialCharacter = (word) => {
    // except for white-space
    for (var x = 0; x < word.length; x++) {
      if (!containLowerCase(word[x]) && !containUpperCase(word[x]) && !/\d/.test(word[x]) && !/\s/.test(word[x])) {
        return true;
      }
    }
    return false;
  }
  const allIsNumber = (word) => {
    for (var x = 0; x < word.length; x++) {
      if (!/\d/.test(word[x])) {
        return false;
      }
    }
    return true;
  }
  const handleNameChange = (event) => {
    const content = event.target.value;
    const words = content.split(/\s/);
    if (content === "") {
      setName({
        value: content,
        error: "Không được để trống!"
      });
    } else if (content[0] === " ") {
      setName({
        value: content,
        error: "Không được bắt đầu bằng khoảng trắng!"
      });
    } else if (content[content.length - 1] === " ") {
      setName({
        value: content,
        error: "Không được kết thúc bằng khoảng trắng!"
      });
    } else if (/\d/.test(content)) {
      setName({
        value: content,
        error: "Không được chứa chữ số!"
      });
    } else if (containLowerCase(content[0]) || containLowerCase(words[words.length - 1][0])) {
      setName({
        value: content,
        error: "Viết hoa ký tự đầu tiên của mỗi từ!"
      });
    } else if ((content.length > 1 && containUpperCase(content.substr(1)) && words.length < 2) || (words[words.length - 1].length > 1 && containUpperCase(words[words.length - 1].substr(1)))) {
      setName({
        value: content,
        error: "Chỉ viết hoa chữ cái đầu tiên của từ!"
      });
    } else if (containSpecialCharacter(content)) {
      setName({
        value: content,
        error: "Không được chứa ký tự đặc biệt!"
      });
    } else if (content.split(/\s/).length - 1 < 1) {
      setName({
        value: content,
        error: "Ít nhất 2 từ đơn!"
      });
    } else {
      setName({
        value: content,
        error: ""
      });
    }
  }

  const [nameX, setName] = useState({
    value: citizenById.name,
    error: "",
  });

  const [id_numberX, setId_number] = useState({
    value: citizenById.id_number,
    error: ""
  });

  const handleId_numberChange = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      setId_number({
        value: content,
        error: "Không được để trống!"
      });
    } else if (allIsNumber(content) === false) {
      setId_number({
        value: content,
        error: "Chỉ được chứa chữ số!"
      });
    } else if (content.length < 9) {
      setId_number({
        value: content,
        error: "Số CMND/CCCD phải đủ 9/12 chữ số!"
      });
    } else if (content.length < 12 && content.length !== 9) {
      setId_number({
        value: content,
        error: "Số CCCD phải đủ 12 chữ số!"
      });
    } else if (content.length > 12) {
      setId_number({
        value: content,
        error: "Không hợp lệ!"
      });
    } else {
      setId_number({
        value: content,
        error: ""
      });
    }
  }

  const [gender, setGender] = useState(citizenById.gender);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const [dobX, handleDoBChange] = useState(new Date(citizenById.dob));

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

  const [address_line1X, setAddress_line1] = React.useState({
    value: citizenById.address_line1,
    error: ""
  });

  const handleAddress_line1Change = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      setAddress_line1({
        value: content,
        error: "Không được để trống!"
      });
    } else {
      setAddress_line1({
        value: content,
        error: ""
      });
    }
  };

  const [address_line2X, setAddress_line2] = React.useState({
    value: citizenById.address_line2,
    error: ""
  });

  const handleAddress_line2Change = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      setAddress_line2({
        value: content,
        error: "Không được để trống!"
      });
    } else {
      setAddress_line2({
        value: content,
        error: ""
      });
    }
  };

    return (
        <div style={styles.root}>
        <ThemeProvider theme={theme}>
          <p style={styles.title}>Thông tin chi tiết</p>
          <form>
              <TextField
                error= {nameX.error !== ""}
                helperText = {nameX.error? nameX.error:''}
                defaultValue={citizenById.name}
                margin="dense"
                label="Họ và tên"
                variant="standard"
                onChange={handleNameChange}
                style={{width: "100%", marginRight: "1vw"}}
                inputProps={{
                  style: {
                    fontSize: "14px",
                    height: "30px",
                  }
                }}
                required
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
                /* value={dobX.value} */
                onChange={handleDoBChange}
              />
              </MuiPickersUtilsProvider>
              <TextField
                error= {id_numberX.error !== ""}
                helperText = {id_numberX.error? id_numberX.error:''}
                defaultValue={citizenById.id_number}
                margin="dense"
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                >
                {
                  HomeTowns.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <TextField
                error= {address_line1X.error !== ""}
                helperText = {address_line1X.error? address_line1X.error:''}
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
                error= {address_line2X.error !== ""}
                helperText = {address_line2X.error? address_line2X.error:''}
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