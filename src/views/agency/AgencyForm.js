import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import { createAgency } from '../../api/apiAgencies';
const init = {
  id:'',
  name: '',
  complated_declared: '',
  staff: {
    username: '',
    password: '',
    operate_from: '',
    operate_to: '',
  }
}

let clicked = false
const validate = (data, username) => {
  let error = {}
  const id_reg = RegExp(`^${username}[0-9][0-9]`)
  console.log(id_reg)
  if(!id_reg.test(data.id)) {
    // alert("True")
    error.id = ['Mã đơn vị phải bắt đầu với tên đăng nhập của bạn + thêm 1 số  từ 01-99']
  
  } 
  if (data.name.trim().length <= 3) {
    error.name = ['Tên cần ít nhất 4 ký tự']
  }
  return error
}
export default function AgencyForm({label, action, initData=init}) {

  const [open, setOpen] = React.useState(false)
  const currentUser = useSelector(state => state.user.currentUser)
  if (!initData.id) {
    initData.id = currentUser.username;
    initData.staff.username = currentUser.username;
  }
  const [data, setData] = React.useState(initData)
  
  
  const onSubmit = () => {
    if (clicked) {
      return 
    }
    clicked = true
    let err = validate(data, currentUser.username)
    if(Object.keys(err).length === 0) {
      (async () => {
        try {
          let res = await createAgency(data)
          console.log(res)
          if (res.status === 201) {
              console.log(res.data)
          } else if (res.status === 400) {
            console.log(res.data)
            setData({
              ...data,
              error: res.data
            })
          }
        } catch (error) {
          
        }
      })()
    }


    
    clicked = false
  }
  const handleChange = (e) => {
    const l = currentUser.username.length
    // const reg = `/^[0-9]{${l},${l + 2}}$/`;
    let {name, value} = e.target;
    if (name ==='id') {
      if (!isNaN(value) && value.length >= l && value.length <= l + 2) {
        
        setData({
          ...data,
          id:value
        }) 
      }     
    } else if(name === 'name'){
      setData({
        ...data,
        name: value
      })
    }else {
      let staff = {...data.staff}

      setData({
        ...data,
        staff: staff
      })
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm đơn vị
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          
          <InputLabel>Thông tin về đơn vị</InputLabel>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            // noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleChange} 
              autoFocus
              margin="dense"
              id="id"
              label="Mã đơn vị"
              type="text"
              name="id"
              fullWidth
              variant="outlined"
              size="small"
              value={data.id}
            />
          <TextField
            onChange={handleChange} 
           
            margin="dense"
            id="name"
            name="name"
            label="Tên đơn vị"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={data.name}
          />
          </Box>
          <InputLabel>Thông tin tài khoản</InputLabel>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            // noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleChange} 
              disabled
              margin="dense"
              id="username"
              name="username"
              label="Tên đăng nhập"
              type="email"
              // fullWidth
              variant="outlined"
              size="small"
              value={data.id}
            />
            <TextField
              onChange={handleChange} 
              margin="dense"
              id="pasword"
              name="password"
              label="Mật khẩu"
              type="text"
              // fullWidth
              variant="outlined"
              size="small"
              value={data.password}
            />
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant="contained" onClick={onSubmit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
