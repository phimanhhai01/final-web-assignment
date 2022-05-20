import React, { useEffect, useState} from "react";
import { Navigate, Outlet, useNavigate  } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Loader from "./Loader"
import { useSelector, useDispatch } from "react-redux";
import {myUser} from "../api/apiUser"
import {userFill} from "../redux/reducers/user/user.thunk"
import { addToast } from "../utils";
import Footer from "./Footer"

const style = {
    main: {
        marginLeft: "var(--sidebar-width)",
        padding: "0 0.5rem",
        backgroundColor: "var(--second-bg)",
       
    }
}
const PrivateRoute = (props) => {
    const navigate = useNavigate()
    const currentUser_id = useSelector(state => state.user.currentUser.id)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!currentUser_id) {
            (async () => {
                try {
                    let res = await myUser()
                    console.log(res)
                    if (res.status === 200) {
                        dispatch(userFill(res.data))
                    } else {
                        localStorage.removeItem('token')
                        navigate('/signin')
                        addToast({
                            type:'info', 
                            title:'Hey!', 
                            message:`Bạn cần đăng nhập lại!`, 
                            duration: 5000
                        })
                    }
                    
                } catch (error) {
                    alert(error.message)
                    navigate('/signin')
                }
            })()
        } else {
            // alert('Just login')
            addToast({
                type:'success', 
                title:'Thành công!', 
                message:`Chào cán bộ!`, 
                duration: 5000
            })
        }
    }, [])
    // const [loading, setLoadding] = useState(true)
    // const authed = isAuthenticated() // isauth() returns true or false based on localStorage
    // lay cais user neeus cos roif thig thooi
    if (! currentUser_id ) {
        return <Loader />
    }
    return (

        <div>
            <Menu />
            <main style={style.main}>
                <div style={{ minHeight: "100vh"}}>
                    <Header />
                    <div className="root-content">
                    <Outlet />
                    </div>
                </div>
                <Footer />

            </main>

        </div>
    )
}

export default PrivateRoute;