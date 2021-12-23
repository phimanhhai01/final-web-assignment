import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from "@mui/material/Button";
import { Ethnics } from "../../constants/citizen/citizens";
import { Religions } from "../../constants/citizen/citizens";
import { LearningLevels } from "../../constants/citizen/citizens";
import { Occupations } from "../../constants/citizen/citizens";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { appendCitizen } from '../../redux/reducers/citizens/citizens.thunk';
import {addToast} from "../../utils"
import { loadAgenciesAsync } from '../../redux/reducers/agencies/agencies.thunk';
import { styled } from '@mui/material/styles';
import Papa from "papaparse";
import { citizen_columns_full, educational } from '../../constants/citizen/citizens';
import TableExtra from '../../components/Table/TableExtra';
import { TableRow, TableCell } from '@mui/material';
import { addMultiCitizens } from "../../api/apiCitizens";
import Loader from "../../core/Loader";

let clicked = false;

const AddCitizenByCSV = () => {
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

  const Input = styled('input')({
    display: 'none',
  });
  const allIsNumber = (word) => {
    for (var x = 0; x < word.length; x++) {
      if (!/\d/.test(word[x])) {
        return false;
      }
    }
    return true;
  }

  const mapSubAgenciesNameToID = (agencyName) => {
    if (currentUser.level === "4") {
      return village_id;
    } else {
      for (var j = 0; j < agencies.length; j++) {
        if (agencies[j].name === agencyName) {
          return agencies[j].id;
        }
      }
    }
  }

  const mapSubAgenciesIDToName = (agencyID) => {
    if (currentUser.level === "4") {
      return currentUser.agency.name;
    } else {
      for (var i = 0; i < agencies.length; i++) {
        if (agencies[i].id === agencyID) {
          return agencies[i].name;
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
    ethnic: "Kinh (Việt)",
    religion: "Không",
    educational: "university",
    declarer: "",
    occupations: "Nhà chuyên môn bậc cao (đại học trở lên)",
    village_id: mapSubAgenciesNameToID(subAgencies[0]),
    home_town: "",
    address_line1: "",
    address_line2: "",
  };

  const [er, setError] = useState([]);
  const [open, setOpen] = React.useState(false)
  const [isError, setErrorState] = React.useState([]);

  const [citizenCSVData, setDataCSV] = useState([]);

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
        },
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

  const validateNameInput = (input) => {
    const content = input;
    const words = content.split(/\s/);
    if (content === '') {
      return "Không được để trống!";
    } else if (content[0] === " ") {
      return "Không được bắt đầu bằng khoảng trắng!";
    } else if (content[content.length - 1] === " ") {
      return "Không được kết thúc bằng khoảng trắng!";
    } else if (/\d/.test(content)) {
      return "Không được chứa chữ số!";
    } else if (containLowerCase(content[0]) || containLowerCase(words[words.length - 1][0])) {
      return "Viết hoa ký tự đầu tiên của mỗi từ!";
    } else if ((content.length > 1 && containUpperCase(content.substr(1)) && words.length < 2) || (words[words.length - 1].length > 1 && containUpperCase(words[words.length - 1].substr(1)))) {
      return "Chỉ viết hoa chữ cái đầu tiên của từ!";
    } else if (containSpecialCharacter(content)) {
      return "Không được chứa ký tự đặc biệt!";
    } else if (content.split(/\s/).length - 1 < 1) {
      return "Ít nhất 2 từ đơn!";
    } else {
      return "";
    }
  }

  const validateId_numberInput = (input) => {
    const content = input;
    if (allIsNumber(content) === false) {
      return "Chỉ được chứa chữ số!"
    } else if (0 < content.length && content.length < 9) {
      return "Số CMND/CCCD phải đủ 9/12 chữ số hoặc để trống khi chưa được cấp!";
    } else if (9 < content.length && content.length < 12) {
      return "Số CCCD phải đủ 12 chữ số!";
    } else if (content.length > 12) {
      return "Không hợp lệ!";
    } else {
      return ""
    }
  }

  const validateDuplicatedId_numberInput = (errors) => {
    // Chưa cập nhật lí do lỗi ở state er mà chỉ cập nhật có đúng hay sai ở state isError
    var updateErrorState = errors;
    for (var i = 0; i < citizenCSVData.length - 1; i++) {
      var current_id_number = citizenCSVData[i].id_number;
      var isDup = false;
      if (current_id_number !== "") {
        if (updateErrorState[i] === false) {
          for (var j = i + 1; j < citizenCSVData.length; j++) {
            if (current_id_number === citizenCSVData[j].id_number) {
              updateErrorState[j] = true;
              isDup = true;
            }
          }
          updateErrorState[i] = isDup;
        }
      }
      if (isDup) {
        addToast({type:'error', title:'Hỏng!', message:`Số CMND/CCCD ${current_id_number} bị trùng lặp`, duration: 5000})
      }
    }
    setErrorState(updateErrorState);
  }

  const validateDobInput = (input) => {
    const content = input;
    let temp = content.split(/[-]/)
    if (temp.length === 3) {
      let today = new Date();
      let dob = new Date(temp[0], temp[1] - 1, temp[2]);
      if (today >= dob) {
        return ""
      }
    }
    return "Không hợp lệ"
  }

  const validateGenderInput = (input) => {
    const content = input;
    if (content === "male" || content === "female") {
      return ""
    } else {
      return "Không hợp lệ"
    }
  }

  const validateEthnicInput = (input) => {
    const content = input;
    for (var i = 0; i < Ethnics.length; i++) {
      if (content === Ethnics[i]) {
        return ""
      }
    }
    return "Không hợp lệ"
  }

  const validateReligionInput = (input) => {
    const content = input;
    if (content === "") {
      return "";
    }
    for (var i = 0; i < Religions.length; i++) {
      if (content === Religions[i]) {
        return ""
      }
    }
    return "Không hợp lệ"
  }

  const validateLearningLevelsInput = (input) => {
    const content = input;
    for (var i = 0; i < LearningLevels.length; i++) {
      if (content === formatEducational(LearningLevels[i])) {
        return ""
      }
    }
    return "Không hợp lệ"
  }

  const validateOccupationsInput = (input) => {
    const content = input;
    for (var i = 0; i < Occupations.length; i++) {
      if (content === Occupations[i]) {
        return ""
      }
    }
    return "Không hợp lệ"
  }

  const validateHomeTownInput = (input) => {
    const content = input;
    if (content === '') {
      return "Không được để trống!";
    } else {
      return "";
    }
  };

  const validateAddress_line1Input = (input) => {
    const content = input;
    if (content === '') {
      return "Không được để trống!";
    } else {
      return "";
    }
  };

  const validateAddress_line2Input = (input) => {
    const content = input;
    if (content === '') {
      return "Không được để trống!";
    } else {
      return "";
    }
  };

  if (village_id.length === 8) {
    subAgencies.push(mapSubAgenciesIDToName(village_id));
  }

  const validateVillage_IDInput = (input) => {
    const content = input;
    for (var i = 0; i < subAgencies.length; i++) {
      if (content === mapSubAgenciesNameToID(subAgencies[i])) {
        return "";
      }
    }
    return "Không có quyền khai báo công dân ở Thôn/Bản/Tổ này";
  }

  const validateBeforeSubmit = (citizen) => {
    let err = {}
    err.name = validateNameInput(citizen.name);
    err.id_number = validateId_numberInput(citizen.id_number);
    err.dob = validateDobInput(citizen.dob);
    err.gender = validateGenderInput(citizen.gender);
    err.ethnic = validateEthnicInput(citizen.ethnic);
    err.religion = validateReligionInput(citizen.religion);
    err.educational = validateLearningLevelsInput(citizen.educational);
    err.occupations = validateOccupationsInput(citizen.occupations);
    err.village_id = validateVillage_IDInput(citizen.village_id);
    err.home_town = validateHomeTownInput(citizen.home_town);
    err.address_line1 = validateAddress_line1Input(citizen.address_line1);
    err.address_line2 = validateAddress_line2Input(citizen.address_line2);
    return err;
  }

  const handleResetInput = (event) => {
    setError([]);
    setErrorState([]);
    setDataCSV([]);
    setOpen(false);
    setDataLoaded(false);
  }

  const checkError = () => {
      var errors = [];
      for (var i = 0; i < citizenCSVData.length; i++) {
        var err = validateBeforeSubmit(citizenCSVData[i]);
        if (err.name === "" && err.id_number === "" && err.dob === "" && err.gender === "" && err.ethnic === "" && err.religion === "" && err.educational === "" && err.occupations === "" && err.village_id === "" && err.home_town === "" && err.address_line1 === "" && err.address_line2 === "") {
          errors.push(false);
        } else {
          errors.push(true);
        }
      }
      setError({
        ...er,
        err
      })
      validateDuplicatedId_numberInput(errors);
  }

  const parseCSV = (fileCSVdata) => {
    return new Promise((resolve) => {
      Papa.parse(fileCSVdata, {
        delimiter: "",
        header: true,
        skipEmptyLines: true,
        complete: function(responses) {
          resolve(responses.data);
        }
      });
    });
  }

  const handleCSVFile = (event) => {
    let fileCSVdata = event.target.files[0];
    (async() => {
      try {
        let data = await parseCSV(fileCSVdata);
        setDataCSV(data);
      } catch (err) {
        console.log("ParseCSV error!");
      }
    })()
  }

  const [dataLoaded, setDataLoaded] = React.useState(false);

  useEffect(() => {
    if (citizenCSVData.length !== 0 && dataLoaded === false) {
      checkError();
      setOpen(true);
      setDataLoaded(true);
    }
  }, [checkError, dataLoaded, citizenCSVData]);

  const handleClose = () => {
    handleResetInput();
  };

  const ableToSubmit = () => {
    for (var i = 0; i < isError.length; i++) {
      if (isError[i] === true) {
        return false;
      }
    }
    return true;
  }

  const updateCitizensList = (data) => {
    return new Promise((resolve) => {
      for (var i = 0; i < data.length; i++) {
        dispatch(appendCitizen(data[i]));
      }
      resolve("Finish update citizens list");
    });
  }

  const handleClick = () => {
    if (clicked) {
      return 
    }
    clicked = true
    if (ableToSubmit()) {
      (async () => {
        try {
          let res = await addMultiCitizens(citizenCSVData);
          if (res.status === 200) {
            await updateCitizensList(res.data);
            addToast({type:'success', title:'Xong!', message:`Khai báo công dân thành công.`, duration: 5000});
            handleResetInput();
          } else {
            addToast({type:'error', title:'Hỏng!', message:`Đã xảy ra lỗi khi thêm công dân.`, duration: 5000})
          }
          clicked = false
        } catch (e) {
          clicked = false
          if (e.response && e.response.data) {
            var errorState = [];
            for (var i = 0; i < e.response.data.length; i++) {
              if(e.response.data[i].id_number && e.response.data[i].id_number[0] === "{'citizen width this id_number has exist'}") {
                /* setError({
                  ...er,
                  id_number: "Số CMND/CCCD đã tồn tại!",
                }); */
                //addToast({type:'error', title:'Hỏng!', message:`Số CMND/CCCD đã tồn tại!`, duration: 5000})
                errorState[i] = true;
              } else {
                errorState[i] = false;
              }
            }
            setErrorState(errorState);
          }
        }
      })();
    }
  }

  useEffect(() => {
    
  }, [isError]);

  const renderData = (item, index) => {
    return (
        <TableRow key={index} hover role="checkbox" tabIndex={-1} style={{background: isError[index] === true ? "red":"#82DD55"}}>
            <TableCell>{item.id_number? item.id_number: "-"}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{new Date(item.dob).toLocaleDateString('en-GB')}</TableCell>
            <TableCell>{item.gender === "male" ? "Nam":"Nữ"}</TableCell>
            <TableCell>{item.ethnic}</TableCell>
            <TableCell>{item.religion?  item.religion: "-"}</TableCell>
            <TableCell>{educational[item.educational]}</TableCell>
            <TableCell>{item.occupations}</TableCell>
            <TableCell>{mapSubAgenciesIDToName(item.village_id)}</TableCell>
            <TableCell>{item.home_town}</TableCell>
            <TableCell>{item.address_line1}</TableCell>
            <TableCell>{item.address_line2}</TableCell>
        </TableRow>
    )
}



    return (
      <div>
          <label htmlFor="contained-button-file">
            <Input accept=".csv" id="contained-button-file" type="file" onChange={handleCSVFile}/>
            <Button style={{background: "#2E3192", color: "white", marginLeft: "10px"}} variant="contained" component="span">
                Khai báo công dân bằng file CSV
            </Button>
          </label>
      <Dialog open={open} onClose={handleClose} maxWidth={true}>
        <DialogTitle style={styles.title}>Khai báo công dân bằng file CSV</DialogTitle>
        <DialogContent>
          <TableExtra
            name="ListCitizensTitles"
            columns = {citizen_columns_full}
            data = {citizenCSVData}
            renderData = {renderData}
            searchEngine = {false}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{background: "#2E3192", color: "white", marginLeft: "10px"}} variant="contained" component="span" onClick={handleClick} disabled>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}

export default AddCitizenByCSV;