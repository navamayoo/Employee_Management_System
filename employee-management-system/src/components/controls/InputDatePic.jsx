import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { TextField } from "@mui/material";

const InputDatePic = (props) => {
  const { name,onChange,  ...rest } = props;
  return (
    <>
      <Field
        {...rest}
        name={name}
        onChange={onChange}
        as={TextField}
        fullWidth
        variant="outlined"
        size="small"
        
      />
      
        <ErrorMessage name={name} component={Error}/>
      
    </>
  );
};
export default InputDatePic;
