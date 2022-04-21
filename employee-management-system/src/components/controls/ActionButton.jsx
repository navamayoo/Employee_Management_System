import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:0,
    margin: useTheme().spacing(0.5),
  },
}));

export default function ActionButton(props) {
  const {size, color, onClick, children } = props;
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      onClick={onClick}
      color={color}
      size={size}
      variant="outlined"
    >
      {children}
    </Button>
  );
}
