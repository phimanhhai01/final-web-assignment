import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getCitizenById, updateCitizen, deleteCitizen } from "../../api/apiCitizens";
import { updateCitizenInTable, deleteCitizenInTable } from '../../redux/reducers/citizens/citizens.thunk'
import Loader from "../../core/Loader";
import { loadAgenciesAsync } from '../../redux/reducers/agencies/agencies.thunk';
import '../../style/citizen.css';

const CitizenProfile = (props) => {
  const {currentUser} = useSelector(state => state.user);
  let editable = (currentUser && (currentUser.level === "3" || currentUser.level === "4"))  ? true:false;
  const { agencies } = useSelector(state => {
    return state.agencies
  });
  useEffect(() => {
    if (agencies.length === 0) {
      dispatch(loadAgenciesAsync());
    }
}, []);
  const subAgencies = [];
  const citizenById = {
    id: "",
    id_number: "",
    name: "",
    dob: "",
    gender: "",
    ethnic: "",
    religion: "",
    educational: "",
    declarer: "",
    occupations: "",
    village_id: "",
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
  const {id} = props;
  const dispatch = useDispatch();

  const [citizen, setData] = useState(citizenById);
  const [er, setError] = useState(error);

  useEffect(() => {
    (async () => {
      try {
        let res = await getCitizenById(id);
        if (res.status === 200) {
          setData(res.data);
        } else if (res.status === 404) {
          alert("Not found");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const theme = createTheme({
      palette: {
          primary: {
              main: "#2E3192",
          },
      },
  });

  const styles = {
    title: {
      fontWeight: "bold",
      fontSize: "25px",
      paddingBottom: "1vh"
    }
  }

  const formatEducational = (learningLevel) => {
    if (learningLevel === "Không") {
      return "none";
    } else if (learningLevel === "Tiểu học") {
      return "primary";
    } else if (learningLevel === "Trung học cơ sở") {
      return "secondary";
    } else if (learningLevel === "Trung học phổ thông") {
      return "high";
    } else if (learningLevel === "Cao đẳng / Đại học") {
      return "university";
    } else if (learningLevel === "Sau đại học") {
      return "master";
    } else if (learningLevel === "none") {
      return "Không";
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

  const navigate = useNavigate();

  const handleChangeError = (name, value) => {
    setError({
      ...er,
      [name]: value
    });
  }
  
  const handleChangeValue = (e) => {
    if (!isNaN(Date.parse(e))) {
      setData({
        ...citizen,
        dob: new Date(e).toLocaleDateString('en-CA')
      });
    } else if (e.target.name === "educational") {
      setData({
        ...citizen,
        educational: e.target.value
      });
    } else if (e.target.value === "male" || e.target.value === "female") {
      setData({
        ...citizen,
        gender: e.target.value
      })
    } else if (e.target.name === "village_id") {
      setData({
        ...citizen,
        village_id: e.target.value
      })
    } else {
      const name = (e.target.name || e.target.id);
      setData({
        ...citizen,
        [name]: e.target.value,
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (citizen.name === "") {
      validateNameInput(e);
    }
    if (citizen.home_town === "") {
      validateHomeTownInput(e);
    }
    if (citizen.address_line1 === "") {
      validateAddress_line1Input(e);
    }
    if (citizen.address_line2 === "") {
      validateAddress_line2Input(e);
    }
    if (citizen.name !== "" && citizen.home_town !== "" && citizen.address_line1 !== "" && citizen.address_line2 !== "") {
      (async () => {
        try {
          let res = await updateCitizen(citizen);
          if (res.status === 200) {
            dispatch(updateCitizenInTable(citizen));
            addToast({type:'success', title:'Xong!', message:`Cập nhật thông tin công dân thành công.`, duration: 5000});
            navigate('/list-citizens');
          } else {
            addToast({type:'error', title:'Hỏng!', message:`Đã xảy ra lỗi khi cập nhật thông tin công dân.`, duration: 5000})
          }
        } catch (e) {
          if (e.response && e.response.data && e.response.data.id_number) {
            if(e.response.data.id_number === "citizen width this id_number has exist") {
              setError({
                ...error,
                id_number: "Số CMND/CCCD đã tồn tại!",
              });
            }
          }
        }
      })();
    }
  }

  const handleDelete = () => {
    (async () => {
      try {
        let res = await deleteCitizen(citizen.id);
        if (res.status === 200 || res.status === 204) {
          dispatch(deleteCitizenInTable(citizen.id));
          addToast({type:'success', title:'Xong!', message:`Xóa thông tin công dân thành công.`, duration: 5000});
          navigate('/list-citizens');
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

  const validateNameInput = (event) => {
    const content = event.target.value;
    const words = content.split(/\s/);
    if (content === "") {
      handleChangeError("name", "Không được để trống!");
    } else if (content[0] === " ") {
      handleChangeError("name", "Không được bắt đầu bằng khoảng trắng!");
    } else if (content[content.length - 1] === " ") {
      handleChangeError("name", "Không được kết thúc bằng khoảng trắng!");
    } else if (/\d/.test(content)) {
      handleChangeError("name", "Không được chứa chữ số!");
    } else if (containLowerCase(content[0]) || containLowerCase(words[words.length - 1][0])) {
      handleChangeError("name", "Viết hoa ký tự đầu tiên của mỗi từ!");
    } else if ((content.length > 1 && containUpperCase(content.substr(1)) && words.length < 2) || (words[words.length - 1].length > 1 && containUpperCase(words[words.length - 1].substr(1)))) {
      handleChangeError("name", "Chỉ viết hoa chữ cái đầu tiên của từ!");
    } else if (containSpecialCharacter(content)) {
      handleChangeError("name", "Không được chứa ký tự đặc biệt!");
    } else if (content.split(/\s/).length - 1 < 1) {
      handleChangeError("name", "Ít nhất 2 từ đơn!");
    } else {
      handleChangeError("name", "");
    }
  }

  const validateId_numberInput = (event) => {
    const content = event.target.value;
    if (allIsNumber(content) === false) {
      handleChangeError("id_number", "Chỉ được chứa chữ số!");
    } else if (0 < content.length && content.length < 9) {
      handleChangeError("id_number", "Số CMND/CCCD phải đủ 9/12 chữ số hoặc để trống khi chưa được cấp!");
    } else if (9 < content.length && content.length < 12) {
      handleChangeError("id_number", "Số CCCD phải đủ 12 chữ số!");
    } else if (content.length > 12) {
      handleChangeError("id_number", "Không hợp lệ!");
    } else {
      handleChangeError("id_number", "");
    }
  }

  const validateHomeTownInput = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      handleChangeError("home_town", "Không được để trống!")
    } else {
      handleChangeError("home_town", "")
    }
  };

  const validateAddress_line1Input = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      handleChangeError("address_line1", "Không được để trống!")
    } else {
      handleChangeError("address_line1", "")
    }
  };

  const validateAddress_line2Input = (event) => {
    const content = event.target.value;
    if (content.length === 0) {
      handleChangeError("address_line2", "Không được để trống!")
    } else {
      handleChangeError("address_line2", "")
    }
  };

  const updateAgencyList = () => {
    for(var i = 0; i < agencies.length; i++) {
      subAgencies.push(agencies[i].name);
    }
  }

  if (citizen.id === "") {
    return <Loader/>
  }
  return (
        <div id="profile">
        <ThemeProvider theme={theme}>
          <p style={styles.title}>Thông tin chi tiết</p>
          <form>
              <TextField
                error= {er.name !== ""}
                helperText = {er.name !== ""? er.name:""}
                value={citizen.name}
                id="name" 
                margin="dense"
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
                InputProps={{
                  readOnly: !editable,
                }}
              />
              <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1.5vh"}}>
              <FormControl style={{width: "30%"}} component="fieldset">
                <FormLabel component="legend" style={{fontSize: "13px"}}>Giới tính *</FormLabel>
                <RadioGroup row aria-label="gender" id="gender" value={citizen.gender} onChange={handleChangeValue}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" disabled={!editable} />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" disabled={!editable} />
                </RadioGroup>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                id="dob" 
                style={{width: "30%"}}
                disableFuture
                value={citizen.dob}
                autoOk
                openTo="year"
                format="dd/MM/yyyy"
                label="Ngày sinh"
                views={["year", "month", "date"]}
                onChange={handleChangeValue}
                readOnly={!editable}
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
                  value={citizen.ethnic}
                  label="Dân tộc"
                  onChange={handleChangeValue}
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
                  value={citizen.religion === ""?"Không":citizen.religion}
                  label="Tôn giáo"
                  onChange={handleChangeValue}
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
                  value={citizen.educational}
                  label="Trình độ học vấn"
                  onChange={handleChangeValue}
                  inputProps={{ readOnly: !editable }}
                >
                {
                  LearningLevels.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)
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
                  inputProps={{ readOnly: !editable }}
                >
                {
                  Occupations.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
                </Select>
              </FormControl>
              {currentUser.level === "3"? (
          <FormControl variant="standard" sx={{ m: 1 }} style={{width: "47%"}}>
          <InputLabel >Thôn/Bản/Tổ *</InputLabel>
          <Select
            name="village_id"
            value={citizen.village_id}
            label="Thôn/Bản/Tổ"
            onChange={handleChangeValue}
            inputProps={{ 
              readOnly: !editable,
              disabled: currentUser.level === "4"
            }}
          >
            {console.log(citizen.village_id)}
            {updateAgencyList()}
          {
            agencies.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
          }
          </Select>
        </FormControl>
        ):null
        }
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
                InputProps={{
                  readOnly: !editable,
                }}
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
                InputProps={{
                  readOnly: !editable,
                }}
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