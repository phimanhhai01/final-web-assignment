import {ReactComponent as Magnifier} from '../images/magnifier.svg';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SearchBar = (props) => {
    const {name, input, searchBy, handleChange} = props

    const styles = {
        root: {
            display: "flex",
            
            // width: "100%",
            // // height: "5vh",
            // borderRadius: "10px",
            // border: "black 1px solid",
            // justifyContent: "flex-start",
            // alignItems: "center",
            // margin: "0.5rem"
        },
        searchby: {
            flexShrink: 1
        },
        search: {
            flexGrow: 1,
            padding: "0 0.5rem"
        }
       
    }
    return (
        <div style={styles.root}>
            
            <div style={styles.search}>
                <TextField 
                    fullWidth 
                    id={`${name}-search`} 
                    placeholder="Search field" 
                    type="search" 
                    variant="outlined" 
                    size="small"
                    name="query"

                    onChange={handleChange}
                />
            </div>
            { searchBy? (
                <div style={styles.searchby}>
                    <TextField
                        id={`${name}-searchby`}
                        select
                        size="small"
                        
                        name="searchBy"
                        value={input.searchBy}
                        onChange={handleChange}
                    
                        >
                        {searchBy.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            ):null

            }
        </div>
    );
}

export default SearchBar;
