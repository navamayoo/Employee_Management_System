import { Card, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
  },
  pageHeader: {
    padding: useTheme().spacing(1),
    display: "flex",
    marginBottom: useTheme().spacing(1),
  },
  pageIcon: {
    display: "inline-block",
    padding: useTheme().spacing(0.5),
    background: "#3CB371",
  },
  pageTitle: {
    paddingLeft: useTheme().spacing(1),
    paddingTop: useTheme().spacing(0),
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { icon, title, subTitle } = props;
  
  return (
    <Paper square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" color="initial" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    
    </Paper>
  );
}
