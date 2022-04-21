import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { TextField } from "@mui/material";

const Input = (props) => {
  const { name,  ...rest } = props;
  return (
    <>
      <Field
        {...rest}
        name={name}
        
        as={TextField}
        fullWidth
        variant="outlined"
        size="small"
        
      />
      
        <ErrorMessage name={name} component={Error}/>
      
    </>
  );
};
export default Input;
