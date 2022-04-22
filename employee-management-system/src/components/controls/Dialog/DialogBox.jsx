import React, { useState } from "react";

import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ActionButton from "../../controls/ActionButton";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogBox(props) {
  const { title, children, open, setOpen, deleteNote} = props;

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ flexGrow: 1 }}
            >
              {title}
            </Typography>

            <ActionButton
              color="error"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </ActionButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do You Want to Delete This.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={deleteNote}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
