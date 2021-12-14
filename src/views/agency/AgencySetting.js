import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import AgencyForm from "./AgencyForm";
import { getAgency, agencyRename, changePassword, toggleDeclarePermision, scheduleDeclarePermission } from "../../api/apiAgencies";
import Loader from "../../core/Loader";
import { TextField, Button, Switch, InputLabel, CircularProgress } from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoadingButton from "@mui/lab/LoadingButton";

import RenameIcon from "@mui/icons-material/DriveFileRenameOutline";
import PasswordIcon from "@mui/icons-material/Password";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box } from "@mui/system";

const styles = {
  showOut: {
    height: "auto",
    transition: "all 0.5s ease",
  },
  hidden: {
    height: "0",
    transition: "all 0.5s ease",
    overflow: "hidden",
  },
  header: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
const init = {
  id: "",
  name: "",
  complated_declared: "",
  staff: {
    username: "",
    password: "",
    operate_from: null,
    operate_to: null,
  },
  error: {},
};
let pre = {};
const AddAgency = () => {
  const { id } = useParams();
  const [data, setData] = useState(init);
  const [loading, setLoading] = useState({
    rename: false,
    changePass: false,
    schedule: false,
    istoggle: false
  });

  const [scheduleTime, setSchedule] = useState({
      operate_from: null,
      operate_to: null
     
  });

  useEffect(() => {
    (async () => {
      try {
        let res = await getAgency(id);
        if (res.status === 200) {
          let dt = res.data;
          dt.staff.password = "";
          pre = dt; // store pre value
          setData(dt);
        } else if (res.status === 404) {
          alert("Not found");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const togglePermission = () => {
    (
      async () => {
        try {
          setLoading({
            ...loading,
              istoggle: true,
          })
          let res = await toggleDeclarePermision(data.staff.id)
          if (res.status === 200) {
            let staff = {
              ...data.staff,
              declared_permission: !data.staff.declared_permission,
            }
            setData({
              ...data,
              staff: staff,
            })
            setLoading({
              ...loading,
                istoggle: false,
            })

          }
        } catch (error) {
          
        }
      }
    )()

    
    

  };

  const rename = () => {
    (async () => {
      try {
        setLoading({
          ...loading,
          rename: true,
        });
        let res = await agencyRename(data.id, { name: data.name });

        if (res.status === 200) {
          // alert('done')
          let dt = res.data;
          dt.staff.password = "";
          pre = dt; // store pre value
          setData(dt);
          setLoading({
            ...loading,
            rename: false,
          });
        } else {
          alert("error");
        }
      } catch (error) {}
    })();
  };

  const changePass = () => {
    (async () => {
      try {
        setLoading({
          ...loading,
          changePass: true,
        });
        let res = await changePassword(data.staff.id, {
          password: data.staff.password,
        });
        console.log(res);
        if (res.status === 200) {
          // alert('done')
          let staff = { ...data.staff, password: "" };
          setData({ ...data, staff: staff });
          setLoading({
            ...loading,
            rename: false,
          });
        } else {
          alert("error");
        }
      } catch (error) {}
    })();
  };

  if (data.id === "") {
    return <Loader />;
  }

  const handleChange = (e) => {
    console.log(e.target);
    console.log("🚀 ~ file: AgencySetting.js ~ line 75 ~ handleChange ~ e", e);
    const { id, value } = e.target;
    console.log("🚀 ~ file: AgencySetting.js ~ line 77 ~ handleChange ~ e", e);
    if (id === "password") {
      setData({
        ...data,
        staff: { ...data.staff, password: value },
      });
    } else {
      setData({
        ...data,
        [id]: value,
      });
    }
  };

  const pickDateTime = (name, value) => {
    setSchedule({
        ...scheduleTime,
        [name]: value
    })
  };
  const schedule = () => {
    
    (async () => {
      try {
        setLoading({
          ...loading, 
          schedule: true
        })
        let data_schedule = {
          operate_from: document.getElementById('operate_from').value,
          operate_to: document.getElementById('operate_to').value,
          user: data.id
        }
        let res = await scheduleDeclarePermission(data_schedule)
        if (res.status === 200) {
        
          let staff = {...data.staff, 
                        operate_from: res.data.operate_from, 
                        operate_to: res.data.operate_to
                      }
          setData({
            ...data, 
            staff: staff
          })
          setSchedule({
            operate_from: null,
            operate_to: null
          })
        } else if (res.status === 400){
          console.log(res.data)
        }
        setLoading({
          ...loading,
          schedule: false,
        })   
      } catch (error) {
        console.log('eoor')
      }
    })()

    
  };
  return (
    <div className="page-limit">
      <div style={styles.header}>
        <h2>Thiết lập</h2>
        <div></div>
      </div>
      <div className="grid grid-col-2 grid-col-sm-1">
        <div>
          <div className="card">
            <div style={{padding: '0.5rem'}}className="card__header">
              <div className='flex-space-between'>
                <span>Thông tin chung</span>
                <span className={`badge ${data.completed_declared? 'badge-success': 'badge-pending '}`}>
                  {data.completed_declared? 'Đã khai báo xong': 'Chưa khai báo xong'}
                </span>
              </div>
            </div>
            <div className="card__body">
              <div className="grid">
                <TextField
                  label="Mã đơn vị"
                  value={data.id}
                  id="id"
                  variant="outlined"
                  onChange={handleChange}
                  disabled
                  fullWidth
                  size="small"
                  helperText='Mã đơn vị là cố định'
                />
                <TextField
                  label="Tên đơn vị"
                  value={data.name}
                  id="name"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
            </div>
            <div className="card__footer">
              <LoadingButton
                disabled={
                  data.name.trim().length < 3 || data.name.trim() === pre.name
                }
                variant="contained"
                onClick={rename}
                endIcon={<RenameIcon />}
                loading={loading.rename}
                loadingPosition="end"
              >
                Lưu
              </LoadingButton>
            </div>
          </div>
        </div>
        <div className="">
          <div className="card">
            <div className="card__header">Thông tin về tài khoản</div>
            <div className="card__body">
              <div className="grid">
                <TextField
                  label="Tên đăng nhập"
                  helperText = 'Tên đăng nhập là cố định'
                  value={data.id}
                  id="username"
                  variant="outlined"
                  onChange={handleChange}
                  disabled
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Mật khẩu"
                  value={data.staff.password}
                  id="password"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  helperText='Bạn có thể đặt lại mật khẩu nhưng không thể xem mật khẩu hiện tại'
                />
              </div>
            </div>
            <div className="card__footer">
              <LoadingButton
                disabled={data.staff.password.length < 3}
                variant="contained"
                onClick={changePass}
                loading={loading.changePass}
                loadingPosition="end"
                endIcon={<PasswordIcon />}
              >
                Đổi mật khẩu
              </LoadingButton>
            </div>
          </div>
        </div>
        <div className="">
          <div className="card">
            <div className="card__header">Quyền khai báo</div>
            <div className="card__body">
              <FormControlLabel
                control={
                  <Switch
                    onChange={togglePermission}
                    checked={data.staff.declared_permission}
                    disabled={loading.istoggle}
                  />
                }
                label={<Box sx={{display:'flex', alignItems:'center'}}>{loading.istoggle?<CircularProgress size={16}/>:null} <InputLabel>Quyền khai báo</InputLabel></Box>}              />
              
              <InputLabel>
                Một lịch trình{" "}
                {new Date().getTime() < Date.parse(data.staff.operate_to)
                  ? "đang diễn ra"
                  : "đã kết thúc"}
              </InputLabel>
              <div className="grid" style={{ marginTop: "1rem" }}>
                <TextField
                  label="Thời gian bắt đầu"
                  type="date-local"
                  disabled
                  size="small"
                  value={data.staff.operate_from}
                />
                <TextField
                  label="Thời gian kết thúc"
                  type="date-local"
                  disabled
                  size="small"
                  value={data.staff.operate_to}
                />
              </div>
              {data.staff.declared_permission? null:(
                <div style={{marginTop:'1rem'}}>
                    {/* {data.staff.operate_to} */}
                    <InputLabel>Lên lịch</InputLabel>
                    <div className="grid" style={{ marginTop: "1rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                        renderInput={(props) => (
                            <TextField
                            readOnly
                            onChange={pickDateTime}
                            id="operate_from"
                            size="small"
                            type="datetime-local"
                            {...props}
                            helperText="Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc"
                            />
                        )}
                        minDate={new Date()}
                        name="operate_from"
                        value={scheduleTime.operate_from}
                        label="Thời gian bắt đầu"
                        onChange={(value) => pickDateTime("operate_from", value)}
                        inputFormat="yyyy-MM-dd'T'HH:mm:ss"
                        disabled={data.staff.declared_permission}
                        />
                        <DateTimePicker
                        renderInput={(props) => (
                            <TextField
                            type="datetime-local"
                            id="operate_to"
                            size="small"
                            {...props}
                            helperText="Thời gian kết thúc phải là một thời điểm trong tương lai"
                            />
                        )}
                        label="Thời gian kết thúc"
                        name="operate_to"
                        value={scheduleTime.operate_to}
                        onChange={(value) => pickDateTime("operate_to", value)}
                        minDate={scheduleTime.operate_from}
                        inputFormat="yyyy-MM-dd'T'HH:mm:ss"
                        disabled={data.staff.declared_permission}
                        />
                    </LocalizationProvider>
                    </div>
                </div>
              )}
              
            </div>
            {!data.staff.declared_permission ? (
              <div className="card__footer">
                {/* <Button 
                                    disabled={data.staff.operate_to === pre.staff.operate_to || 
                                        data.staff.operate_from === pre.staff.operate_from} 
                                    variant='contained'>Lên lịch</Button> */}
                <LoadingButton
                  onClick={schedule}
                  disabled={
                    (!scheduleTime || scheduleTime.operate_from == null || scheduleTime.operate_to == null ) || (
                        scheduleTime.operate_to === pre.staff.operate_to ||
                        scheduleTime.operate_from === pre.staff.operate_from
                    )
                  }
                  loading={loading.schedule}
                  loadingPosition="end"
                  variant="contained"
                  endIcon={<ScheduleIcon />}
                >
                  Lên lịch
                </LoadingButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAgency;
