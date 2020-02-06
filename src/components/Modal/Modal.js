import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";



const Modal = ({descriptionElementRef, handleClose, open, scroll, title, item, handleCancel, handleConfirm, content}) => {
    
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
      <DialogTitle id="scroll-dialog-title"><b>{title}</b></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
          </DialogContentText>
          {/* <div>
              Are you sure you want to delete <b>{item.name}</b> beer?
          </div> */}
            {content}
            
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            No
          </Button>
          <Button onClick={() => handleConfirm(item.id)} color="primary">
            Yes
          </Button>
        </DialogActions>
  </Dialog>
    )
}


Modal.propTypes = {
    descriptionElementRef: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  };
  
export default Modal;