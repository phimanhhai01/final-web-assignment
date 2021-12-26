import {useState, useMemo} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Filter from '../../components/Filter';
import SearchBar from '../../components/SearchBar';

const filterData = (data, search) => {
  if(search.query === "" || !search.searchBy) {
    return data
  } else {
    console.log(search)
    return data.filter(item => item[search.searchBy] && item[search.searchBy].toString().toLowerCase().includes(search.query.toLowerCase()))
  }
}

export default function TableExtra(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {data, renderData, columns, searchBy, name, title, searchEngine} = props;
  const styles = {
    searchEngine: {
        display: searchEngine? "flex":"none",
        alignItems: "center",
        borderBottom: "1px solid var(--border-color)",
        padding: "0.5rem"
        // margin: "0.5rem"
    }, 
    searchBarWrapper: {
        flexGrow: 1
    },
    title: {
      padding: "1rem",
      borderBottom: "1px solid var(--border-color)"
    }
  }
  const [search, setSearch] = useState({
    query: "",
    searchBy: searchBy?  searchBy[0].value: null     
  })

  const dataShow = useMemo(() => {
    return filterData(data, search)
  }, [data, search])
  
  const handleSearch = (event) => {
    console.log("🚀 ~ file: TableExtra.js ~ line 39 ~ handleSearch ~ event", event.target.value,  event.target.name)
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {title? (
          <div style={styles.title}>
            {title}
          </div>
        ):null
          

        }
        <div style={styles.searchEngine}>
            <div>
                <Filter/>
            </div>
            <div style={styles.searchBarWrapper}>
                <SearchBar name={name} input ={search} handleChange={handleSearch} searchBy={searchBy}/>
            </div>
        </div>
      <TableContainer sx={{ maxHeight: "cacl(100vh - 125px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataShow
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => renderData(row, index))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số  hàng"
      />
    </Paper>
  );
}
TableExtra.defaultProps = {
  data: [],
  renderData: (item, index) => index,
  columns: [],
  name: "TableExtra-"
}