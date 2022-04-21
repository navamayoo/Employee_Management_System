import React from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
//import FormHelperText from '@mui/material/FormHelperText';

export default function SelectInput(props) {
  const { name, label, options, ...rest } = props;
  return (
    <>
      <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>{label}</InputLabel>
        <Field
          as={Select}
          {...rest}
          name={name}
         label={label}
         labelId="demo-simple-select-label"
         // id={name}
          size="small"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Field>
        {/* <FormHelperText>Required</FormHelperText> */}
      </FormControl>
    
        <ErrorMessage name={name} component={Error}/>
      
    </>
  );
}
