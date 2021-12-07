import React, { useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const styles= {
    dialogPaper: {
        minHeight: "50vh",
        maxHeight: "50vh",
        marginTop: "20vh"
    }
};
const A1Filter = ({classes}) => {
    const [open, setOpen] = useState(false);

    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState([]);
    let selectedList = []
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const onSelect = (selectedProvince) => {
      setSelectedProvince(selectedProvince);
    }
    const onRemove = (selectedProvince) => {
      setSelectedProvince(selectedProvince);
    }
    useEffect(() => {
      console.log(selectedProvince);
    }, [selectedProvince]);
    return (
        <>
            <button onClick={handleOpen}>
                Bộ lọc 
            </button>
            <Dialog
                style={{height: "500px"}}
                fullWidth={true}
                open={open}
                maxWidth={'xl'}
                onClose={handleClose}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle>Bộ Lọc</DialogTitle>
                <DialogContent>
                    <span>Tỉnh/Thánh Phố</span>
                    <Multiselect
                        displayValue="name"
                        onRemove={onRemove}
                        onSearch={function noRefCheck(){}}
                        onSelect={onSelect}
                        onChange={setSelectedProvince}
                        options={[
                          {
                            name: 'Hà Nội',
                            id: '01'
                          },
                          {
                            name: 'Hải Phòng',
                            id: '02'
                          },
                          {
                            name: 'Thái Bình',
                            key: '03'
                          },
                          {
                            name: 'Bắc Giang',
                            id: '04'
                          },
                          {
                            name: 'Hồ  Chí Minh',
                            id: '05'
                          },
                          {
                            name: 'Cần Thơ',
                            id: '06'
                          }
                        ]}
                        showArrow
                        showCheckbox
                        style={{
                            multiselectContainer: {
                                width: "30%"
                            }
                        }}
                    />
                    <span>Quận/Huyện</span>
                    <Multiselect
                        displayValue="name"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(){}}
                        options={[
                          {
                            name: 'Vũ Thư',
                            id: '0101'
                          },
                          {
                            name: 'Kiến Xương',
                            id: '0102'
                          },
                          {
                            name: 'Thái Thụy',
                            id: '0103'
                          },
                          {
                            name: 'Đông Hưng',
                            id: '0104'
                          },
                          {
                            name: 'Hưng Hà',
                            id: '0105'
                          },
                          {
                            name: 'Tiền Hải',
                            id: '0106'
                          }
                        ]}
                        showArrow
                        showCheckbox
                        style={{
                          multiselectContainer: {
                              width: "30%"
                          }
                      }}
                    />
                    <span>Xã</span>
                    <Multiselect
                        displayValue="name"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(){}}
                        options={[
                          {
                            name: 'Trà Giang',
                            id: '010201'
                          },
                          {
                            name: 'Hồng Thái',
                            id: '010202'
                          },
                          {
                            name: 'Lê Lợi',
                            id: '010203'
                          },
                          {
                            name: 'Nam Cao',
                            id: '010204'
                          },
                        ]}
                        showArrow
                        showCheckbox
                        style={{
                          multiselectContainer: {
                              width: "30%"
                          }
                      }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default withStyles(styles)(A1Filter);