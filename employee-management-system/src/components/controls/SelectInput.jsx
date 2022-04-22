import React from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
//import FormHelperText from '@mui/material/FormHelperText';

export default function SelectInput(props) {
  const { name, label, options, ...rest } = props;
  return (
    <>
      <FormControl sx={{minWidth: 250 }} size="small">
        <InputLabel>{label}</InputLabel>
        <Field as={Select} id={name} name={name} {...rest}>
          {options &&
            options.map((option, index) => (
              <MenuItem key={index} value={option.departmentId}>
                {option.departmentName}
              </MenuItem>
            ))}
        </Field>
        {/* <Field
          as={Select}
          {...rest}
          name={name}
          label={label}
          
          size="small"
        >
          {options &&
          options.map((option, index) => (
            <MenuItem key={index} value={option.departmentId}>
              {option.departmentName}
            </MenuItem>
          ))}
          {/* {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
          </Field> 
        
        <FormHelperText>Required</FormHelperText> */}
      </FormControl>

      <ErrorMessage name={name} component={Error} />
    </>
  );
}
