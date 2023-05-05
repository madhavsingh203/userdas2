import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Checkbox, TableHead } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  //handling pagination (MUI Implementation)
  const handleFirstPageButtonClick = (e) => {
    onPageChange(e, 0);
  };

  const handleBackButtonClick = (e) => {
    onPageChange(e, page - 1);
  };

  const handleNextButtonClick = (e) => {
    onPageChange(e, page + 1);
  };

  const handleLastPageButtonClick = (e) => {
    onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({
  usersData,
  setUsersData,
  handleDelete,
  handleEdit,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  let rows = usersData;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    //Page change to be handled here for pagination
  const handleChangePage = (e, newPage) => {
    setPage(newPage);


    // setting the page change for the header checkbox to select the checkboxes available
    setCurrentPage(newPage + 1);
    //  console.log("page::", page)
    //  console.log(newPage)
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };


  // Remove the selected rows from the usersData
  const handleDeleteSelected = () => {
    
    const newData = usersData.filter((row) => !selectedRows.includes(row));
    setUsersData(newData);
    setSelectedRows([]);
    setSelectAll(false);
  };

  //selecting checkboxes for Delete selected functionality
  const handleCheckbox = (e, row) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter((r) => r !== row));
    }
  };


//select all functionality for the header checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentRows);
      setSelectAll(true);
    } else {
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const rowsPerPageHere = 10;

  const indexOfLastRow = currentPage * rowsPerPageHere;
  const indexOfFirstRow = indexOfLastRow - rowsPerPageHere;
  const currentRows = usersData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead className="header">
          <tr>
            <th>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="center">
                <Checkbox
                  checked={selectedRows.includes(row)}
                  onChange={(e) => handleCheckbox(e, row)}
                />
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.role}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                <button
                  className="action-button"
                  onClick={() => handleEdit(index)}
                >
                  <EditIcon />
                </button>
                <button
                  className="action-button"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <button
              className="delete-selected-button"
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
            >
              <b>Delete Selected</b>
            </button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
