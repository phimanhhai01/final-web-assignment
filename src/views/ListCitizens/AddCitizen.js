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
    if (nameX.value === "") {
      handleNameChange(event);
    }
    if (address_line1X.value === "") {
      handleAddress_line1Change(event);
    }
    if (address_line2X.value === "") {
      handleAddress_line2Change(event);
    }
    
    if (nameX.error === "" && address_line1X.error === "" && address_line2X.error === "") {
      const dob = dobX.toLocaleDateString('en-CA');
      const educational = formatEducational(learningLevel);
      const name = nameX.value;
      const id_number = id_numberX.value;
      const address_line1 = address_line1X.value;
      const address_line2 = address_line2X.value;
      addCitizen({id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
      navigate(`/list-citizens/`);
    }
  }

  const [nameX, setName] = useState({
    value: "",
    error: "",
  });
    
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

  const [id_numberX, setId_number] = useState({
    value: "",
    error: ""
  });

  const handleId_numberChange = (event) => {
    const content = event.target.value;
    if (allIsNumber(content) === false) {
      setId_number({
        value: content,
        error: "Chỉ được chứa chữ số!"
      });
    } else if (0 < content.length && content.length < 9) {
      setId_number({
        value: content,
        error: "Số CMND/CCCD phải đủ 9/12 chữ số hoặc để trống khi chưa được cấp!"
      });
    } else if (9 < content.length && content.length < 12) {
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

  const [gender, setGender] = useState("male");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const [dobX, handleDoBChange] = useState(new Date());

  const [ethnic, setEthnic] = React.useState("Kinh (Việt)");

  const handleEthnicChange = (event) => {
    setEthnic(event.target.value);
  };

  const [religion, setReligion] = React.useState("Không");

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };

  const [learningLevel, setLearningLevel] = React.useState("Cao đẳng / Đại học");

  const handleLearningLevelChange = (event) => {
    setLearningLevel(event.target.value);
  };

  const [occupations, setOccupation] = React.useState("Nhà chuyên môn bậc cao (đại học trở lên)");

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const [home_town, setHomeTown] = React.useState("Hà Nội");

  const handleHomeTownChange = (event) => {
    setHomeTown(event.target.value);
  };

  const [address_line1X, setAddress_line1] = React.useState({
    value: "",
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
    value: "",
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
          <p style={styles.title}>Khai báo công dân</p>
          <form>
              <TextField   
                error= {nameX.error !== ""}
                helperText = {nameX.error? nameX.error:''}
                margin="dense"
                name="name" 
                /* value={nameX.value} */
                defaultValue=""
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
                defaultValue={null}
                name="dob" 
                style={{marginTop: "8px", marginRight: "1vw"}}
                disableFuture
                autoOk
                openTo="year"
                format="dd/MM/yyyy"
                label="Ngày sinh *"
                views={["year", "month", "date"]}
                value={dobX}
                onChange={handleDoBChange}
              />
              </MuiPickersUtilsProvider>
              <TextField
                error= {id_numberX.error !== ""}
                helperText = {id_numberX.error? id_numberX.error:''}
                margin="dense"
                name="id_number" 
                /* value={id_numberX.value} */
                /* defaultValue="" */
                label="Số CCCD/CMND"
                variant="standard"
                onChange={handleId_numberChange}
                required
              />
              <FormControl style={{margin: "2vh 0 0 0", width: "100%"}} component="fieldset">
                <FormLabel component="legend" style={{fontSize: "13px"}}>Giới tính</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" /* value="male" */ defaultValue="male" onChange={handleGenderChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 120, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Dân tộc *</InputLabel>
                <Select
                  name="ethnic"
                  defaultValue="Kinh (Việt)"
                  /* value="Kinh (Việt)" */
                  onChange={handleEthnicChange}
                  label="Dân tộc *"
                  required
                >
                {
                  Ethnics.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1}} style={{minWidth: 120, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Tôn giáo *</InputLabel>
                <Select
                  name="religion"
                  defaultValue="Không"
                  /* value="Không" */
                  onChange={handleReligionChange}
                  label="Tôn giáo *"
                >
                {
                  Religions.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 180, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Trình độ học vấn *</InputLabel>
                <Select
                  name="educational"
                  defaultValue="Cao đẳng / Đại học"
                  /* value="Cao đẳng / Đại học" */
                  onChange={handleLearningLevelChange}
                  label="Trình độ học vấn *"
                >
                {
                  LearningLevels.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 150, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Nghề nghiệp *</InputLabel>
                <Select
                  name="occupations"
                  defaultValue="Nhà chuyên môn bậc cao (đại học trở lên)"
                  /* value="Nhà chuyên môn bậc cao (đại học trở lên)" */
                  onChange={handleOccupationChange}
                  label="Nghề nghiệp *"
                >
                {
                  Occupations.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{minWidth: 150, marginTop: "1.5vh", marginRight: "1vw"}}>
                <InputLabel >Quê quán *</InputLabel>
                <Select
                  name="home_town"
                  defaultValue="Hà Nội"
                  /* value="Hà Nội" */
                  onChange={handleHomeTownChange}
                  label="Quê quán *"
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
                name="address_line1"
                /* value={address_line1X.value} */
                defaultValue=""
                onChange={handleAddress_line1Change}
                label="Địa chỉ thường trú"
                fullWidth
                multiline={true}
                variant="standard"
                required
              />
              <TextField
                error= {address_line2X.error !== ""}
                helperText = {address_line2X.error? address_line2X.error:''}
                style={{ marginTop: "3vh"}}
                name="address_line2"
                /* value={address_line2X.value} */
                defaultValue=""
                onChange={handleAddress_line2Change}
                label="Địa chỉ tạm trú"
                fullWidth
                multiline={true}
                variant="standard"
                required
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