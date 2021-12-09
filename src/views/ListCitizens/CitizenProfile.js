import React, { useEffect } from 'react';
import { LearningLevels, Ethnics, Religions } from '../../constants/citizen/citizens';
import { useDispatch, useSelector } from 'react-redux';
import { loadCitizenByIdAsync } from '../../redux/reducers/citizens/citizens.thunk';
const CitizenProfile = (props) => {
    const {id} = props;
    const dispatch = useDispatch();
    const { citizenById } = useSelector(state => state.citizens);
    useEffect(() => {
        dispatch(loadCitizenByIdAsync(id));
    }, []);
    const styles = {
        root: {
            border: "black 1px solid",
            borderRadius: "10px",
            width: "45vw",
            height: "65vh",
        },
        Info: {
            fontSize: "25px",
            fontWeight: "bold",
            padding: "1.7vh 0 0 3vw",
            marginBottom: "2.5vh",
        },
        /* InputBlock: {
            display: "flex",
            marginBottom: "4vh",
            padding: "0 3vw 0 3vw",
            alignItems: "center"
        }, */
        label: {
            fontSize: "15px",
            fontWeight: "bold",
            marginRight: "1vw",
        },
        /* input: {
            paddingLeft: "1.5vw",
            fontSize: "15px",
            borderWidth: "0",
            borderBottomWidth: "0.3vh",
            borderColor: "#2E3192",
            height: "5vh",
            ':focus': {
                borderBottomWidth: "0vh",
            }
        }, */
        /* submitButton: {
            background: "#2E3192",
            color: "white",
            fontSize: "17px",
            borderRadius: "17px",
            border: "none",
            width: "10vw",
            height: "5vh",
        },
        ButtonBlock: {
            marginTop: "8vh",
            textAlign: "center"
        }, */
        Form: {
            display: "flex",
        },
        CitizenInfo: {
            background: "#2E3192",
            color: "white",
            borderRadius: "10px",
            padding: "0.5vw",
            textAlign: "center"
        },
        CitizenInfoBlock: {
            marginBottom: "4vh",
            alignItems: "center"
        },
        /* RadioButton_Area: {
            display: "flex"
        },
        RadioButton_Space: {
            marginRight: "2vw",
        },
        dropdownList: {
            height: "4.8vh",
            marginRight: "0.3vw",
            paddingLeft: "0.3vw",
            borderRadius: "10px",
        },
        option: {
            zoom: "1.5"
        }, */
        LeftSide: {
            width: "20vw",
            padding: "0 0 0 3vw",
        },
        RightSide: {
            width: "20vw",
            padding: "0 3vw 0 3vw",
        }
    }
    return (
        <div style={styles.root}>
            <p style={styles.Info}>Thông tin chi tiết</p>
            <form style={styles.Form}>
                <div style={styles.LeftSide}>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Họ và tên</label>
                        {/* <input style={styles.input}/> */}
                        <div style={styles.CitizenInfo}>{citizenById.name}</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Ngày sinh</label>
                        <div style={styles.CitizenInfo}>{citizenById.dob}</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Ngày mất</label>
                        <div style={styles.CitizenInfo}>{citizenById.dod === null && "Không"}</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Giới tính</label>
                        {/* <div style={styles.RadioButton_Area}>
                            <input type="radio" id="male" name="gender" value="male" checked></input>
                            <label for="male" style={styles.RadioButton_Space}>Nam</label>
                            <input type="radio" id="female" name="gender" value="female"></input>
                            <label for="female">Nữ</label>
                        </div> */}
                        <div style={styles.CitizenInfo}>{citizenById.gender}</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Dân tộc</label>
                        {/* <select name="Ethnics" id="Ethnics_DropdownList" style={styles.dropdownList}>
                            {Ethnics.map((element, index) => {
                                return <option key={index} style={styles.option}>{element}</option>
                            })}
                        </select> */}
                        <div style={styles.CitizenInfo}>{citizenById.ethnic}</div>
                    </div>
                </div>
                <div style={styles.RightSide}>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Tôn giáo</label>
                        {/* <select name="Religions" id="Religions_DropdownList" style={styles.dropdownList}>
                            {Religions.map((element, index) => {
                                return <option key={index} style={styles.option}>{element}</option>
                            })}
                        </select> */}
                        <div style={styles.CitizenInfo}>{citizenById.religion}</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Trình độ học vấn</label>
                        {/* <select name="LearningLevels" id="LearningLevels_DropdownList" style={styles.dropdownList}>
                            {LearningLevels.map((element, index) => {
                                return <option key={index} style={styles.option}>{element}</option>
                            })}
                        </select> */}
                        <div style={styles.CitizenInfo}>{citizenById.educational}</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Trình trạng hôn nhân</label>
                        {/* <div style={styles.RadioButton_Area}>
                            <input type="radio" id="single" name="marital_status" value="single"></input>
                            <label for="single" style={styles.RadioButton_Space}>Độc thân</label>
                            <input type="radio" id="married" name="marital_status" value="married"></input>
                            <label for="married">Đã kết hôn</label>
                        </div> */}
                        <div style={styles.CitizenInfo}>{citizenById.marital_status === false ? "Độc thân" : "Đã kết hôn" }</div>
                    </div>
                    <div style={styles.CitizenInfoBlock}>
                        <label style={styles.label}>Địa chỉ</label>
                        <div style={styles.CitizenInfo}>{citizenById.home_town}</div>
                    </div>
                    {/* <div style={styles.ButtonBlock}>
                        <button style={styles.submitButton} type='submit'>Cập nhật</button>
                    </div> */}
                </div>
            </form>
        </div>
    );
}

export default CitizenProfile;