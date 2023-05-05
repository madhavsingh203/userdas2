import React, { useEffect } from "react";
import Edit from "./Edit";
import Box from "@mui/material/Box";
//import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";
//import { useState } from 'react';

const EditModal = ({
  usersData,
  setUsersData,
  indexToBeUpdated,
  setIsEdit,
}) => {
  const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);

  //Modal Behaviour change
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  //Edit functionality when modal is openend
  const handleIsEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    handleIsEdit();
  }, []);
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Edit
              handleClose={handleClose}
              usersData={usersData}
              setUsersData={setUsersData}
              indexToBeUpdated={indexToBeUpdated}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;
