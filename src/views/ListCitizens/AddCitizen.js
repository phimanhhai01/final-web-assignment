import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { useNavigate } from 'react-router';
import { Ethnics } from "../../constants/citizen/citizens";
import { Religions } from "../../constants/citizen/citizens";
import { LearningLevels } from "../../constants/citizen/citizens";
import { Occupations } from "../../constants/citizen/citizens";
import { addCitizen } from "../../api/apiCitizens";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { appendCitizen } from '../../redux/reducers/citizens/citizens.thunk';
import {addToast} from "../../utils"

const AddCitizen = () => {
  const {currentUser} = useSelector(state => state.user);
  const village_id = currentUser.agency.id;
  let submitExistId_number = false;

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
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nameX.value === "") {
      handleNameChange(event);
    }
    if (home_townX.value === "") {
      handleHomeTownChange(event);
    }
    if (address_line1X.value === "") {
      handleAddress_line1Change(event);
    }
    if (address_line2X.value === "") {
      handleAddress_line2Change(event);
    }

    if (nameX.error === "" && home_townX.error === "" && address_line1X.error === "" && address_line2X.error === "") {
      const dob = dobX.toLocaleDateString('en-CA');
      const educational = formatEducational(learningLevel);
      const name = nameX.value;
      const id_number = id_numberX.value;
      const home_town = home_townX.value;
      const address_line1 = address_line1X.value;
      const address_line2 = address_line2X.value;
      (async () => {
        try {
          let res = await addCitizen({id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
          if (res.status === 200) {
            dispatch(appendCitizen({id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2}));
            handleClose();
            addToast({type:'success', title:'Xong!', message:`Khai báo công dân thành công.`, duration: 5000});
            navigate(`/list-citizens/`);
          } else {
            addToast({type:'error', title:'Hỏng!', message:`Đã xảy ra lỗi khi thêm công dân.`, duration: 5000})
          }
        } catch (e) {
          if (e.response && e.response.data && e.response.data.id_number) {
            if(e.response.data.id_number[0] === "{'citizen width this id_number has exist'}") {
              setId_number({
                ...id_numberX,
                error: "Số CMND/CCCD đã tồn tại!",
              });
              submitExistId_number = true;
            }
          }
        }
      })();
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

  const [id_numberX, setId_number] = useState({
    value: "",
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
    if (submitExistId_number === false) {
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
    } else {
      submitExistId_number = false;
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

  const [home_townX, setHomeTown] = React.useState({
    value: "",
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
    value: "",
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
    value: "",
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

  const handleResetInput = (event) => {
    setName({
      value: "",
      error: ""
    });
    handleDoBChange(new Date());
    setId_number({
      ...id_numberX,
      value: ""
    });
    setGender("male");
    setEthnic("Kinh (Việt)");
    setReligion("Không");
    setLearningLevel("Cao đẳng / Đại học");
    setOccupation("Nhà chuyên môn bậc cao (đại học trở lên)");
    setHomeTown({
      value: "",
      error: ""
    });
    setAddress_line1({
      value: "",
      error: ""
    });
    setAddress_line2({
      value: "",
      error: ""
    });
  }

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleResetInput();
  };
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Khai báo công dân mới 
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={styles.title}>Khai báo công dân</DialogTitle>
        <DialogContent>
        <ThemeProvider theme={theme}>
          <form>
              <TextField   
                error= {nameX.error !== ""}
                helperText = {nameX.error? nameX.error:''}
                margin="dense"
                name="name" 
                value={nameX.value}
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
                required
              />
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1.5vh"}}>
              <FormControl component="fieldset" style={{width: "30%"}}>
                <FormLabel component="legend" style={{fontSize: "13px"}}>Giới tính *</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                name="dob" 
                style={{width: "30%"}}
                disableFuture
                autoOk
                openTo="year"
                format="dd/MM/yyyy"
                label="Ngày sinh *"
                views={["year", "month", "date"]}
                value={dobX}
                onChange={(date) => handleDoBChange(date)}
              />
              </MuiPickersUtilsProvider>
              <TextField
                error= {id_numberX.error !== ""}
                helperText = {id_numberX.error? id_numberX.error:''}
                name="id_number" 
                value={id_numberX.value}
                style={{width: "30%"}}
                label="Số CCCD/CMND"
                variant="standard"
                onChange={handleId_numberChange}
                onBlur={validateId_numberInput}
                required
              />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1.5vh"}}>
                <FormControl variant="standard" sx={{ m: 1 }} style={{width: "30%"}}>
                  <InputLabel >Dân tộc *</InputLabel>
                  <Select
                  name="ethnic"
                  value={ethnic}
                  onChange={handleEthnicChange}
                  label="Dân tộc *"
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
                  onChange={handleReligionChange}
                  label="Tôn giáo *"
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
                  onChange={handleLearningLevelChange}
                  label="Trình độ học vấn *"
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
                  onChange={handleOccupationChange}
                  label="Nghề nghiệp *"
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
                required
              />
              <TextField
                error= {address_line1X.error !== ""}
                helperText = {address_line1X.error? address_line1X.error:''}
                style={{ marginTop: "3vh" }}
                name="address_line1"
                value={address_line1X.value}
                onChange={handleAddress_line1Change}
                onBlur={validateAddress_line1Input}
                label="Địa chỉ thường trú"
                inputProps={{
                  style: {
                    fontSize: "18px",
                  }
                }}
                fullWidth
                variant="standard"
                required
              />
              <TextField
                error= {address_line2X.error !== ""}
                helperText = {address_line2X.error? address_line2X.error:''}
                style={{ marginTop: "3vh"}}
                name="address_line2"
                value={address_line2X.value}
                onChange={handleAddress_line2Change}
                onBlur={validateAddress_line2Input}
                label="Địa chỉ tạm trú"
                inputProps={{
                  style: {
                    fontSize: "18px",
                  }
                }}
                fullWidth
                variant="standard"
                required
              />
          {/* <div style={{display: "flex", justifyContent: "flex-end", marginTop: "3vh"}}>
            <Button style={{background: "lightgrey", color: "black"}} type="button" onClick={handleResetInput}>Reset</Button>
            <Button style={{background: "#2E3192", color: "white", marginLeft: "10px"}} type="submit" onClick={handleSubmit}>Thêm</Button>
          </div> */}
          </form>
        </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button style={{background: "lightgrey", color: "black"}} onClick={handleResetInput}>Reset</Button>
          <Button style={{background: "#2E3192", color: "white", marginLeft: "10px"}} type="submit" onClick={handleSubmit}>Thêm</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}

export default AddCitizen;