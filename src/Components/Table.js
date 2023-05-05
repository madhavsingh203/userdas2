import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CustomPaginationActionsTable from "./PaginationCard";
import { useState } from "react";
import EditModal from "./EditModal";

const TableCard = (props) => {
  const { usersData, setUsersData, handleSearch, searchData } = props;

  // const [editName, setEditName] = useState("");
  // const [editEmail, setEditEmail] = useState("");
  // const [editRole, setEditRole] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  // const [searchData, setSearchData] = useState("");
  const [indexToBeUpdated, setindexToBeUpdated] = useState(undefined);

  const headings = [
    {
      id: 1,
      label: "Name",
    },
    {
      id: 2,
      label: "Email",
    },
    {
      id: 3,
      label: "Role",
    },
    {
      id: 4,
      label: "Actions",
    },
  ];

  //Delete functionality to be handled here
  const handleDelete = (index) => {
    const userCopy = [...usersData];
    userCopy.splice(index, 1);
    setUsersData(userCopy);
  };
  //console.log(indexToBeUpdated)

  // Edit functionality to be handled here
  const handleEdit = (index) => {
    setindexToBeUpdated(index);

    setIsEdit(true);
  };
  //console.log(indexToBeUpdated)

  
  return (
    <>
      <Box
        className="search-bar"
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          value={searchData}
          onChange={(e) => handleSearch(e)}
          fullWidth
          label="Search for Name, Email or Role"
          id="fullWidth"
        />
      </Box>
      <Table hover className="user-table align-items-center">
        {/* <thead>
          <tr>
            <Checkbox />
            <th key={headings.id} className="border-bottom">Name</th>
            <th key={headings.id} className="border-bottom">Email</th>
            <th key={headings.id} className="border-bottom">Role</th>
            <th key={headings.id} className="border-bottom">Actions</th>
          </tr>
          </thead> */}

        <tbody>
          <CustomPaginationActionsTable
            usersData={usersData}
            setUsersData={setUsersData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </tbody>

        <></>
      </Table>

      {/* <Pagination count={10} showFirstButton showLastButton /> */}
      {isEdit && (
        <EditModal
          usersData={usersData}
          setUsersData={setUsersData}
          indexToBeUpdated={indexToBeUpdated}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default TableCard;
