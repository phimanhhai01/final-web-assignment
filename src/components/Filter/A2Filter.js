import React from 'react';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const styles= {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh",
        marginTop: "50vh"
    }
};
const A2Filter = ({classes}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <button onClick={handleOpen}>
                Bộ lọc 
            </button>
            <Dialog
                fullWidth={true}
                open={open}
                maxWidth={'xl'}
                onClose={handleClose}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle>Bộ Lọc</DialogTitle>
                <DialogContent>
                    <span></span>
                    <Multiselect
                        displayValue="key"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(){}}
                        options={[
                          {
                            cat: 'Group 1',
                            key: 'Option 1'
                          },
                          {
                            cat: 'Group 1',
                            key: 'Option 2'
                          },
                          {
                            cat: 'Group 1',
                            key: 'Option 3'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 4'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 5'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 6'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 7'
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
                    <Multiselect
                        displayValue="key"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(){}}
                        options={[
                          {
                            cat: 'Group 1',
                            key: 'Option 1'
                          },
                          {
                            cat: 'Group 1',
                            key: 'Option 2'
                          },
                          {
                            cat: 'Group 1',
                            key: 'Option 3'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 4'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 5'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 6'
                          },
                          {
                            cat: 'Group 2',
                            key: 'Option 7'
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
                </DialogContent>
            </Dialog>
        </>
    );
}

export default withStyles(styles)(A2Filter);