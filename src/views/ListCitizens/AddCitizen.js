import React, { useEffect, useState } from 'react';
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
import { loadAgenciesAsync } from '../../redux/reducers/agencies/agencies.thunk';

let clicked = false

const AddCitizen = () => {
  const {currentUser} = useSelector(state => state.user);
  const village_id = currentUser.agency.id;
  const { agencies } = useSelector(state => {
    return state.agencies
  });
  var subAgencies = [];
  for(var i = 0; i < agencies.length; i++) {
    subAgencies.push(agencies[i].name);
  }

  useEffect(() => {
    if (agencies.length === 0) {
      dispatch(loadAgenciesAsync());
    }
  }, []);
  const theme = createTheme({
        palette: {
            primary: {
                main: "#2E3192",
            },
        },
  });
  const allIsNumber = (word) => {
    for (var x = 0; x < word.length; x++) {
      if (!/\d/.test(word[x])) {
        return false;
      }
    }
    return true;
  }

  const mapSubAgenciesId = (agency) => {
    if (typeof agency !== 'undefined') {
      if (currentUser.level === "4") {
        if (allIsNumber(agency)) {
          return currentUser.agency.name
        } else {
          return village_id;
        }
      } else if (allIsNumber(agency)) {
        for (var i = 0; i < agencies.length; i++) {
          if (agencies[i].id === agency) {
            return agencies[i].name;
          }
        }
      } else {
        for (var j = 0; j < agencies.length; j++) {
          if (agencies[j].name === agency) {
            return agencies[j].id;
          }
        }
      }
    }
  }
  const citizenById = {
    id: "",
    id_number: "",
    name: "",
    dob: new Date().toLocaleDateString('en-CA'),
    gender: "male",
    ethnic: "Kinh",
    religion: "Không",
    educational: "primary",
    declarer: "",
    occupations: "Nhà chuyên môn bậc cao (đại học trở lên)",
    village_id: mapSubAgenciesId(subAgencies[0]),
    home_town: "",
    address_line1: "",
    address_line2: "",
  };
  const error = {
    id_number: "",
    name: "",
    home_town: "",
    address_line1: "",
    address_line2: "",
  }

  const [citizen, setData] = useState(citizenById);
  const [er, setError] = useState(error);

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
    } else if (learningLevel === "Sau đại học") {
      return "master";
    } else if (learningLevel === "Sau đại học") {
      return "master";
    } else if (learningLevel === "primary") {
      return "Tiểu học";
    } else if (learningLevel === "secondary") {
      return "Trung học cơ sở";
    } else if (learningLevel === "high") {
      return "Trung học phổ thông";
    } else if (learningLevel === "university") {
      return "Cao đẳng / Đại học";
    } else if (learningLevel === "master") {
      return "Sau đại học";
    } 
  }

  const dispatch = useDispatch()
  
  const handleChangeValue = (e) => {
    // village_id 
    if (!isNaN(Date.parse(e))) {
      setData({
        ...citizen,
        dob: new Date(e).toLocaleDateString('en-CA')
      });
    } else if (e.target.name === "educational") {
      setData({
        ...citizen,
        educational: formatEducational(e.target.value)
      });
    } else if (e.target.value === "male" || e.target.value === "female") {
      setData({
        ...citizen,
        gender: e.target.value
      })
    } else if (e.target.name === "village_id") {
      setData({
        ...citizen,
        village_id: mapSubAgenciesId(e.target.value)
      })
    } else {
      const name = (e.target.name || e.target.id);
      setData({
        ...citizen,
        [name]: e.target.value,
      });
    }
  };

  
  const handleSubmit = (event) => {
    if (clicked) {
      console.log("return")
      return 
    }
    clicked = true
    let err = validateBeforeSubmit();
    if (err.name === "" && err.id_number === "" && err.home_town === "" && err.address_line1 === "" && err.address_line2 === "") {
      (async () => {
        try {
          let res = await addCitizen(citizen);
          if (res.status === 200) {
            dispatch(appendCitizen(res.data));
            addToast({type:'success', title:'Xong!', message:`Khai báo công dân thành công.`, duration: 5000});
            handleResetInput();
          } else {
            addToast({type:'error', title:'Hỏng!', message:`Đã xảy ra lỗi khi thêm công dân.`, duration: 5000})
          }
          clicked = false
        } catch (e) {
          clicked = false
          if (e.response && e.response.data && e.response.data.id_number) {
            if(e.response.data.id_number[0] === "{'citizen width this id_number has exist'}") {
              setError({
                ...error,
                id_number: "Số CMND/CCCD đã tồn tại!",
              });
            }
          }
        }
      })();
    } else {
      clicked = false
      setError(err);
    }
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

  const validateNameInput = () => {
    const content = citizen.name;
    const words = content.split(/\s/);
    if (content === '') {
      setError({
        ...er,
        name: "Không được để trống!"
      })
      return "Không được để trống!";
    } else if (content[0] === " ") {
      setError({
        ...er,
        name: "Không được bắt đầu bằng khoảng trắng!"
      })
      return "Không được bắt đầu bằng khoảng trắng!";
    } else if (content[content.length - 1] === " ") {
      setError({
        ...er,
        name: "Không được kết thúc bằng khoảng trắng!"
      })
      return "Không được kết thúc bằng khoảng trắng!";
    } else if (/\d/.test(content)) {
      setError({
        ...er,
        name: "Không được chứa chữ số!"
      })
      return "Không được chứa chữ số!";
    } else if (containLowerCase(content[0]) || containLowerCase(words[words.length - 1][0])) {
      setError({
        ...er,
        name: "Viết hoa ký tự đầu tiên của mỗi từ!"
      })
      return "Viết hoa ký tự đầu tiên của mỗi từ!";
    } else if ((content.length > 1 && containUpperCase(content.substr(1)) && words.length < 2) || (words[words.length - 1].length > 1 && containUpperCase(words[words.length - 1].substr(1)))) {
      setError({
        ...er,
        name: "Chỉ viết hoa chữ cái đầu tiên của từ!"
      })
      return "Chỉ viết hoa chữ cái đầu tiên của từ!";
    } else if (containSpecialCharacter(content)) {
      setError({
        ...er,
        name: "Không được chứa ký tự đặc biệt!"
      })
      return "Không được chứa ký tự đặc biệt!";
    } else if (content.split(/\s/).length - 1 < 1) {
      setError({
        ...er,
        name: "Ít nhất 2 từ đơn!"
      })
      return "Ít nhất 2 từ đơn!";
    } else {
      setError({
        ...er,
        name: ""
      })
      return "";
    }
  }

  const validateId_numberInput = () => {
    const content = citizen.id_number;
    if (allIsNumber(content) === false) {
      setError({
        ...er,
        id_number: "Chỉ được chứa chữ số!"
      })
      return "Chỉ được chứa chữ số!";
    } else if (0 < content.length && content.length < 9) {
      setError({
        ...er,
        id_number: "Số CMND/CCCD phải đủ 9/12 chữ số hoặc để trống khi chưa được cấp!"
      })
      return "Số CMND/CCCD phải đủ 9/12 chữ số hoặc để trống khi chưa được cấp!";
    } else if (9 < content.length && content.length < 12) {
      setError({
        ...er,
        id_number: "Số CCCD phải đủ 12 chữ số!"
      })
      return "Số CCCD phải đủ 12 chữ số!";
    } else if (content.length > 12) {
      setError({
        ...er,
        id_number: "Không hợp lệ!"
      })
      return "Không hợp lệ!";
    } else {
      setError({
        ...er,
        id_number: ""
      })
      return ""
    }
  }

  const validateHomeTownInput = () => {
    const content = citizen.home_town;
    if (content === '') {
      setError({
        ...er,
        home_town: "Không được để trống!"
      })
      return "Không được để trống!";
    } else {
      setError({
        ...er,
        home_town: ""
      })
      return "";
    }
  };

  const validateAddress_line1Input = () => {
    const content = citizen.address_line1;
    if (content === '') {
      setError({
        ...er,
        address_line1: "Không được để trống!"
      })
      return "Không được để trống!";
    } else {
      setError({
        ...er,
        address_line1: ""
      })
      return "";
    }
  };

  const validateAddress_line2Input = () => {
    const content = citizen.address_line2;
    if (content === '') {
      setError({
        ...er,
        address_line2: "Không được để trống!"
      })
      return "Không được để trống!";
    } else {
      setError({
        ...er,
        address_line2: ""
      })
      return "";
    }
  };

  const validateBeforeSubmit = () => {
    let err = {}
    err.name = validateNameInput();
    err.id_number = validateId_numberInput();
    err.home_town = validateHomeTownInput();
    err.address_line1 = validateAddress_line1Input();
    err.address_line2 = validateAddress_line2Input();
    return err;
  }

  if (village_id.length === 8) {
    subAgencies.push(mapSubAgenciesId(village_id));
  }

  const handleResetInput = (event) => {
    setData(citizenById);
    setError(error);
  }

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    handleResetInput();
    setData({
      ...citizen,
      village_id: mapSubAgenciesId(subAgencies[0])
    })
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
                error= {er.name !== ""}
                helperText = {er.name !== ""? er.name:""}
                value={citizen.name}
                id="name" 
                margin="dense"
                name="name" 
                label="Họ và tên"
                variant="standard"
                onChange={handleChangeValue}
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
                <RadioGroup row aria-label="gender" id="gender" value={citizen.gender} onChange={handleChangeValue}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                id="dob" 
                style={{width: "30%"}}
                disableFuture
                autoOk
                openTo="year"
                format="dd/MM/yyyy"
                label="Ngày sinh *"
                views={["year", "month", "date"]}
                value={citizen.dob}
                onChange={handleChangeValue}
              />
              </MuiPickersUtilsProvider>
              <TextField
                error= {er.id_number !== ""}
                helperText = {er.id_number ? er.id_number:""}
                value={citizen.id_number}
                style={{width: "30%"}}
                id="id_number" 
                label="Số CCCD/CMND"
                variant="standard"
                onChange={handleChangeValue}
                onBlur={validateId_numberInput}
                required
              />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1.5vh"}}>
                <FormControl variant="standard" sx={{ m: 1 }} style={{width: "30%"}}>
                  <InputLabel >Dân tộc *</InputLabel>
                  <Select
                  name="ethnic"
                  value={citizen.ethnic}
                  label="Dân tộc"
                  onChange={handleChangeValue}
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
                  value={citizen.religion}
                  label="Tôn giáo"
                  onChange={handleChangeValue}
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
                  value={formatEducational(citizen.educational)}
                  label="Trình độ học vấn"
                  onChange={handleChangeValue}
                >
                {
                  LearningLevels.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "3vh"}}>
              <FormControl variant="standard" sx={{ m: 1 }} style={{width: "47%"}}>
                <InputLabel >Nghề nghiệp *</InputLabel>
                <Select
                  name="occupations"
                  value={citizen.occupations}
                  label="Nghề nghiệp"
                  onChange={handleChangeValue}
                >
                {
                  Occupations.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1 }} style={{width: "47%"}}>
                <InputLabel >Thôn/Bản/Tổ *</InputLabel>
                <Select
                  name="village_id"
                  value={mapSubAgenciesId(citizen.village_id)}
                  label="Thôn/Bản/Tổ"
                  onChange={handleChangeValue}
                  inputProps={{ 
                    disabled: currentUser.level === "4"
                  }}
                >
                {
                    subAgencies.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              </div>
              <TextField
                error= {er.home_town !== ""}
                helperText = {er.home_town ? er.home_town:""}
                style={{ marginTop: "3vh" }}
                id="home_town"
                value={citizen.home_town}
                onChange={handleChangeValue}
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
                error= {er.address_line1 !== ""}
                helperText = {er.address_line1 ? er.address_line1:""}
                style={{ marginTop: "3vh" }}
                value={citizen.address_line1}
                id="address_line1"
                label="Địa chỉ thường trú"
                fullWidth
                variant="standard"
                onChange={handleChangeValue}
                onBlur={validateAddress_line1Input}
                inputProps={{
                  style: {
                    fontSize: "18px",
                  }
                }}
                required
              />
              <TextField
                error= {er.address_line2 !== ""}
                helperText = {er.address_line2 ? er.address_line2:""}
                style={{ marginTop: "3vh" }}
                id="address_line2"
                value={citizen.address_line2}
                label="Địa chỉ tạm trú"
                fullWidth
                variant="standard"
                onChange={handleChangeValue}
                onBlur={validateAddress_line2Input}
                inputProps={{
                  style: {
                    fontSize: "18px",
                  }
                }}
                required
              />
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