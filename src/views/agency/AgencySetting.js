import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router';
import AgencyForm from './AgencyForm'
import { getAgency, agencyRename, changePassword } from '../../api/apiAgencies';
import Loader from '../../core/Loader'
import { TextField, Button, Switch, InputLabel } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControlLabel from '@mui/material/FormControlLabel';

const styles = {
    showOut: {
        height: "auto",
        transition: 'all 0.5s ease',
        
    }, 
    hidden: {
        height:'0',
        transition: 'all 0.5s ease',
        overflow: 'hidden'
    },
    header: {
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
};
const init = {
    id:'',
    name: '',
    complated_declared: '',
    staff: {
      username: '',
      password: '',
      operate_from: null,
      operate_to: null,
    },
    error: {}
}
let pre = {

}
const AddAgency = () => {
    const {id} = useParams()
    const [data, setData] = useState(init)

    
    useEffect( () => {
        (async () => {
            try {
                let res = await getAgency(id)
                if (res.status === 200) {
                    let dt = res.data
                    dt.staff.password = ''
                    pre = dt // store pre value
                    setData(dt)
                } else if (res.status === 404) {
                    alert("Not found")
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const togglePermission = () => {
        let staff = {...data.staff, declared_permission: !data.staff.declared_permission}
        setData({
            ...data,
            staff: staff
        })
    }

    const rename = () => {
        (async () => {
            try {
                let res = await agencyRename(data.id, {name: data.name})
                console.log(res)
                if (res.status === 200) {
                    alert('done')
                    let dt = res.data
                    dt.staff.password = ''
                    pre = dt // store pre value
                    setData(dt)
                } else {
                    alert('error')
                }
            } catch (error) {
                
            }
        })()
    }

    const changePass = () => {
        (async () => {
            try {
                let res = await changePassword(data.staff.id, {password: data.staff.password})
                console.log(res)
                if (res.status === 200) {
                    alert('done')
                    let staff = {...data.staff, password: ''}

                    
                    
                    setData({...data, staff: staff})
                } else {
                    alert('error')
                }
            } catch (error) {
                
            }
        })()
    }

    if (data.id === '') {
        return <Loader />
    }
    const handleChange = (e) => {
        console.log(e.target)
        console.log("🚀 ~ file: AgencySetting.js ~ line 75 ~ handleChange ~ e", e)
        const {id, value} = e.target
        console.log("🚀 ~ file: AgencySetting.js ~ line 77 ~ handleChange ~ e", e)
        if (id ==='password') {
            setData({
                ...data, 
                staff: {...data.staff, password: value}
            })    
        } else {
            setData({
            ...data, 
            [id]: value
        })
        }
        
    }
    
    const pickDateTime = (name, value) => {
        setData({
            ...data,
            staff: {...data.staff, [name]: value}
        })
        console.log(data)
    }
    return (
        <div className="page-limit">
            <div style={styles.header}>
                <h2>Thiết lập</h2>
                <div></div>
            </div>
            <div className='grid grid-col-2'>
                <div >
                    <div className="card">
                        <div className="card__header">Thông tin chung</div>
                        <div className="card__body">
                            <div className= 'grid'>
                                <TextField 
                                    label='Mã đơn vị'
                                    value = {data.id}
                                    id="id"
                                    variant='outlined'
                                    onChange={handleChange}
                                    disabled
                                    fullWidth
                                    size='small'
                                />
                                <TextField 
                                    label='Tên đơn vị'
                                    value = {data.name}
                                    id="name"
                                    variant='outlined'
                                    onChange={handleChange}
                                    fullWidth
                                    size='small'
                                    
                                />

                            </div>
                        </div>
                        <div className="card__footer">
                            <Button disabled={data.name.trim().length < 3 || data.name.trim() === pre.name} 
                                variant='contained'
                                onClick={rename}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>                    
                </div>
                <div className="">
                    <div className="card">
                        <div className="card__header">Thông tin về  tài khoản</div>
                        <div className="card__body">
                            <div className= 'grid'>
                                <TextField 
                                    label='Tên đăng nhập'
                                    value = {data.id}
                                    id="username"
                                    variant='outlined'
                                    onChange={handleChange}
                                    disabled
                                    fullWidth
                                    size='small'
                                />
                                <TextField 
                                    label='Mật khẩu'
                                    value = {data.staff.password}
                                    id="password"
                                    variant='outlined'
                                    onChange={handleChange}
                                    fullWidth
                                    size='small'
                                />
                            </div>
                        </div>
                        <div className="card__footer">
                            <Button disabled={data.staff.password.length < 3} 
                                variant='contained'
                                onClick={changePass}
                                >Đổi mật khẩu</Button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="card">
                        <div className="card__header">Quyền khai báo</div>
                        <div className="card__body">
                            <FormControlLabel control={<Switch onChange={togglePermission} checked={data.staff.declared_permission} />} label={<InputLabel>Quyền khai báo</InputLabel>} />
                            <div style={data.staff.declared_permission? styles.hidden:styles.showOut }>
                                <InputLabel>Lên lịch</InputLabel>
                                <div className= 'grid' style={{marginTop:'1rem'}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField readOnly onChange={pickDateTime}
                                                                        id="operate_from" size='small' {...props} 
                                                                        helperText='Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc'/>
                                                                }
                                            name = "operate_from"
                                            value={data.staff.operate_from}
                                            label="Thời gian bắt đầu"
                                            onChange={(value) =>  pickDateTime('operate_from', value)}
                                            inputFormat="yyyy-MM-dd'T'HH:mm"
                                        />
                                        <DateTimePicker
                                            renderInput={(props) => <TextField id="operate_to" size='small' {...props} 
                                                                        helperText='Thời gian kết thúc phải là một thời điểm trong tương lai'/>
                                                        }
                                            label="Thời gian kết thúc"
                                            name = "operate_to"
                                            value={data.staff.operate_to}
                                            onChange={(value) =>  pickDateTime('operate_to', value)}
                                           
                                            inputFormat="yyyy-MM-dd'T'HH:mm:ss"
                                            
                                        />
        
                                    </LocalizationProvider>    
                            </div>
                            </div>
                        </div>
                        {!data.staff.declared_permission? (
                            <div className="card__footer">
                                <Button disabled variant='contained'>Lên lịch</Button>
                            </div>
                        ):null }
                        
                    </div>
                </div>
            </div>

        </div>

    )
}
export default AddAgency
