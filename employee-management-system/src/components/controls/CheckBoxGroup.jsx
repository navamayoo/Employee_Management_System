import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";

export default function CheckBoxGroup(props) {
  const { name, label, options, ...rest } = props;
  return (
    <>
      <FormControl>
        <FormLabel component="legend" size="small">
          {label}
        </FormLabel>
        <Field name={name} {...rest}>
          
            {({ field }) => {
              return options.map((option) => {
                return (
                  
                  <React.Fragment key={option.key}>
                    <FormControlLabel
                      className="row"
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                      control={<Checkbox size="small" />}
                      label={option.key}
                    />
                  </React.Fragment>
                
                );
              });
            }}
         
        </Field>
      </FormControl>
      <Error>
        <ErrorMessage name={name} />
      </Error>
    </>
  );
}
