import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCitizenByIdAsync } from '../../redux/reducers/citizens/citizens.thunk';
import { useNavigate } from 'react-router';
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
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {addToast} from "../../utils"
import { updateCitizen, deleteCitizen } from "../../api/apiCitizens";
import { updateCitizenInTable, deleteCitizenInTable } from '../../redux/reducers/citizens/citizens.thunk'

const CitizenProfile = (props) => {
  const {currentUser} = useSelector(state => state.user);
  const village_id = currentUser.agency.id;
  let editable = currentUser && currentUser.level === "4" ? true:false;
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
    if (home_townX.value === "") {
      handleHomeTownChange(event);
    }
    if (address_line1X.value === "") {
      console.log("Enter add1");
      handleAddress_line1Change(event);
    }
    if (address_line2X.value === "") {
      console.log("Enter add2");
      handleAddress_line2Change(event);
    }
    if (nameX.error === "" && address_line1X.error === "" && address_line2X.error === "") {
      const dob = dobX.toLocaleDateString('en-CA');
      const educational = formatEducational(learningLevel);
      const name = nameX.value;
      const id_number = id_numberX.value;
      const home_town = home_townX.value;
      const address_line1 = address_line1X.value;
      const address_line2 = address_line2X.value;
      (async () => {
        try {
          let res = await updateCitizen({id,id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
          if (res.status === 200) {
            dispatch(updateCitizenInTable({id,id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2}));
            addToast({type:'success', title:'Xong!', message:`Cập nhật thông tin công dân thành công.`, duration: 5000});
            navigate(`/list-citizens/`);
          } else {
            addToast({type:'error', title:'Hỏng!', message:`Đã xảy ra lỗi khi cập nhật thông tin công dân.`, duration: 5000})
          }
        } catch (error) {}
      })();
    }
  }

  const handleDelete = () => {
    (async () => {
      try {
        let res = await deleteCitizen(id);
        if (res.status === 200 || res.status === 204) {
          dispatch(deleteCitizenInTable(id));
          addToast({type:'success', title:'Xong!', message:`Xóa thông tin công dân thành công.`, duration: 5000});
          navigate(`/list-citizens`);
        } else {
          addToast({type:'error', title:'Hỏng!', message:`Đã xảy ra lỗi khi cập nhật thông tin công dân.`, duration: 5000})
        }
      } catch (error) {}
    })();
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
    setName({
      ...nameX,
      value: event.target.value,
    });
  }
  const validateNameInput = (event) => {
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
    setId_number({
      ...id_numberX,
      value: event.target.value,
    });
  }

  const validateId_numberInput = (event) => {
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

  const [home_townX, setHomeTown] = React.useState({
    value: citizenById.home_town,
    error: ""
  });

  const handleHomeTownChange = (event) => {
    setHomeTown({
      ...home_townX,
      value: event.target.value,
    });
  }

  const validateHomeTownInput = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      setHomeTown({
        value: content,
        error: "Không được để trống!"
      });
    } else {
      setHomeTown({
        value: content,
        error: ""
      });
    }
  };

  const [address_line1X, setAddress_line1] = React.useState({
    value: citizenById.address_line1,
    error: ""
  });

  const handleAddress_line1Change = (event) => {
    setAddress_line1({
      ...address_line1X,
      value: event.target.value,
    });
  }

  const validateAddress_line1Input = (event) => {
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
    setAddress_line2({
      ...address_line2X,
      value: event.target.value,
    });
  }

  const validateAddress_line2Input = (event) => {
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
                value={nameX.value}
                name="name" 
                margin="dense"
                label="Họ và tên"
                variant="standard"
                onChange={handleNameChange}
                onBlur={validateNameInput}
                style={{width: "100%"}}
                inputProps={{
                  style: {
                    fontSize: "17px",
                  }
                }}
                InputProps={{
                  readOnly: !editable,
                }}
              />
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1.5vh"}}>
              <FormControl style={{width: "30%"}} component="fieldset">
                <FormLabel component="legend" style={{fontSize: "13px"}}>Giới tính *</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" disabled={!editable} />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" disabled={!editable} />
                </RadioGroup>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                name="dob" 
                style={{width: "30%"}}
                disableFuture
                value={dobX}
                autoOk
                openTo="year"
                format="dd/MM/yyyy"
                label="Ngày sinh"
                views={["year", "month", "date"]}
                onChange={(date) => handleDoBChange(date)}
                readOnly={!editable}
              />
              </MuiPickersUtilsProvider>
              <TextField
                error= {id_numberX.error !== ""}
                helperText = {id_numberX.error? id_numberX.error:''}
                value={id_numberX.value}
                style={{width: "30%"}}
                name="id_number" 
                label="Số CCCD/CMND"
                variant="standard"
                onChange={handleId_numberChange}
                onBlur={validateId_numberInput}
                InputProps={{
                  readOnly: !editable,
                }}
              />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1.5vh"}}>
              <FormControl variant="standard" sx={{ m: 1 }} style={{width: "30%"}}>
                <InputLabel >Dân tộc *</InputLabel>
                <Select
                  name="ethnic"
                  value={ethnic}
                  label="Dân tộc"
                  onChange={handleEthnicChange}
                  inputProps={{ readOnly: !editable }}
                >
                {
                  Ethnics.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1}} style={{width: "30%"}}>
                <InputLabel >Tôn giáo *</InputLabel>
                <Select
                  name="religion"
                  value={religion}
                  label="Tôn giáo"
                  onChange={handleReligionChange}
                  inputProps={{ readOnly: !editable }}
                >
                {
                  Religions.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{width: "30%"}}>
                <InputLabel >Trình độ học vấn *</InputLabel>
                <Select
                  name="educational"
                  value={learningLevel}
                  label="Trình độ học vấn"
                  onChange={handleLearningLevelChange}
                  inputProps={{ readOnly: !editable }}
                >
                {
                  LearningLevels.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              </div>
              <FormControl variant="standard" sx={{ m: 1 }} style={{width: "100%", marginTop: "2.5vh"}}>
                <InputLabel >Nghề nghiệp *</InputLabel>
                <Select
                  name="occupations"
                  value={occupations}
                  label="Nghề nghiệp"
                  onChange={handleOccupationChange}
                  inputProps={{ readOnly: !editable }}
                >
                {
                  Occupations.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <TextField
                error= {home_townX.error !== ""}
                helperText = {home_townX.error? home_townX.error:''}
                style={{ marginTop: "3vh" }}
                name="home_town"
                value={home_townX.value}
                onChange={handleHomeTownChange}
                onBlur={validateHomeTownInput}
                label="Quê quán"
                inputProps={{
                  style: {
                    fontSize: "17px",
                  }
                }}
                fullWidth
                variant="standard"
                InputProps={{
                  readOnly: !editable,
                }}
              />
              <TextField
                error= {address_line1X.error !== ""}
                helperText = {address_line1X.error? address_line1X.error:''}
                style={{ marginTop: "3vh" }}
                value={address_line1X.value}
                name="address_line1"
                label="Địa chỉ thường trú"
                fullWidth
                variant="standard"
                onChange={handleAddress_line1Change}
                onBlur={validateAddress_line1Input}
                inputProps={{
                  style: {
                    fontSize: "18px",
                  }
                }}
                InputProps={{
                  readOnly: !editable,
                }}
              />
              <TextField
                error= {address_line2X.error !== ""}
                helperText = {address_line2X.error? address_line2X.error:''}
                style={{ marginTop: "3vh" }}
                name="address_line2"
                value={address_line2X.value}
                label="Địa chỉ tạm trú"
                fullWidth
                variant="standard"
                onChange={handleAddress_line2Change}
                onBlur={validateAddress_line2Input}
                inputProps={{
                  style: {
                    fontSize: "18px",
                  }
                }}
                InputProps={{
                  readOnly: !editable,
                }}
              />
              {
                editable ? (
                  <>
                  <div style={{display: "flex", justifyContent: "flex-end", marginTop: "3vh"}}>
                    <Button style={{marginRight: "10px", background: "lightgrey"}} onClick={handleDelete} type="button">Xóa</Button>
                    <Button style={{background: "#2E3192", color: "white"}} onClick={handleUpdate} type="button">Cập nhật</Button>
                  </div>
                  </>
                ) : null
              }
          </form>
        </ThemeProvider>
    </div>
    );
}

export default CitizenProfile;