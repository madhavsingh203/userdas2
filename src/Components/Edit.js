import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Edit = ({ usersData, setUsersData, handleClose, indexToBeUpdated }) => {
  const [isValidate, setIsValidate] = useState(false);
  //const [userDataOfIndex, setUserdataOfIndex] = useState(usersData[indexToBeUpdated])
  let userDataOfIndex = usersData[indexToBeUpdated];
  console.log(userDataOfIndex);


  //Edit name
  const handleEditName = (e) => {
    userDataOfIndex.name = e.target.value;

    // console.log(userDataOfIndex)
  };

  //Edit email
  const handleEditEmail = (e) => {
    // if(!(e.target.value.includes('@') && e.target.value.includes('.'))){
    //     alert('please enter a valid email')
    // }
    userDataOfIndex.email = e.target.value;
    //console.log(userDataOfIndex)
  };

  //Edit role
  const handleEditRole = (e) => {
    userDataOfIndex.role = e.target.value;
    //console.log(userDataOfIndex)
  };

  //Save button functionality
  const handleSave = (e) => {
    // usersData.name = userDataOfIndex.name
    // usersData.email = userDataOfIndex.email
    //console.log(e.target.value)

    usersData = userDataOfIndex;
    handleClose();
  };

  // console.log(usersData)

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3 style={{ margin: "2px" }}>Edit Details</h3>
        {/* <label htmlFor="Name">  Name :     </label>
        <input onChange={(e)=>handleEditName(e)}/>
        <br/>
        <label htmlFor="Email">  Email  :   </label>
        <input type="email" onChange={(e)=>handleEditEmail(e)}/>
        <br/>
        <label htmlFor="Role">  Role  :   </label>
        <input onChange={(e)=>handleEditRole(e)}/>
        <br/> */}
        <TextField
          onChange={(e) => handleEditName(e)}
          size="small"
          id="outlined-size-small"
          label="Name"
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <TextField
          onChange={(e) => handleEditEmail(e)}
          size="small"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <TextField
          onChange={(e) => handleEditRole(e)}
          size="small"
          id="outlined-basic"
          label="Role"
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <br />
        <div className="modal-button">
          <Button onClick={(e) => handleSave(e)} variant="contained">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default Edit;
