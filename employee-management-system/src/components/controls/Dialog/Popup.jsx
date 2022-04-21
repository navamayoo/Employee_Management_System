import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import ActionButton from "../../controls/ActionButton";
import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup}=props;
  return (
   <Dialog open={openPopup}>
       <DialogTitle >
       <div style={{ display: "flex" }}>
         <Typography variant="h6" gutterBottom component="div" style={{ flexGrow: 1 }}>
       {title}
      </Typography>
            
    <ActionButton
    color="error"
    size="small"
    onClick={() => setOpenPopup(false)}
    >
    <CloseIcon />
    </ActionButton>
    </div>
       </DialogTitle>
       <DialogContent dividers>
       {children}
       </DialogContent>

   </Dialog>
  )
}
