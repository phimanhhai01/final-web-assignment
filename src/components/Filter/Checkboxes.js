import React, {useState} from 'react';
import { Autocomplete, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Checkbox } from '@mui/material';
import  CheckBoxOutlineBlankIcon  from '@mui/icons-material/CheckBoxOutlineBlank';
import  CheckBoxIcon  from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { addFilterList } from '../../redux/reducers/citizens/citizens.thunk';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const FilterComponent = ({data, setOpenDialog, filterList}) => {
    const [selectedOptions, setSelectedOptions] = useState(filterList);
    const handleChange = (event, value) => {
        setSelectedOptions(value)
    }
    const dispatch = useDispatch();
    return (
      <>
        <Autocomplete
            key={`checkox ${filterList[0]}`}
            multiple
            id="checkboxes"
            defaultValue={filterList}
            options={data}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                {option.name}
                </li>
            )}
            onChange={handleChange}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="Chọn đơn vị" placeholder="Nhập tên" />
            )}
        />
        <Button
          variant="contained"
          onClick={() => {
            setOpenDialog(false);
            dispatch(addFilterList(selectedOptions))
          }}
        >
          Xác nhận
        </Button>
      </>
    );
}
export default FilterComponent;