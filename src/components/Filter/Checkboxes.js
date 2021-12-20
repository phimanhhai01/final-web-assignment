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
const FilterComponent = ({data, setOpen, filterList}) => {
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
                <TextField {...params} size="small" label="Chọn đơn vị" placeholder="Nhập tên" />
            )}
        />
        <div style={{width: "100%", marginTop: "8px", display: "flex", justifyContent: "end"}}>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              dispatch(addFilterList(selectedOptions));
            }}
            size="small"
          >
            Xác nhận
          </Button>
        </div>
      </>
    );
}
export default FilterComponent;