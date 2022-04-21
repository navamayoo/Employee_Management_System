import React from 'react';
import {Button as MuiButton} from '@mui/material';
import { makeStyles} from '@mui/styles';
import { useTheme } from "@mui/system";

const useStyles = makeStyles(Theme=>({
root:{
    margin: useTheme().spacing(1)
},
label:{
    textTransform:'none'
}
}))

export default function Button(props) {

    const classes = useStyles();
    
    const{text,size, variant,color, onClick , ...other} = props;

    return (
        <MuiButton 
                variant={variant || 'contained'}
        size={size || 'medium'}
        color={color}
        onClick={onClick}
        {...other}
        classes={{root: classes.root, label: classes.label}}
        >
            {text }
        </MuiButton>
    )
}
