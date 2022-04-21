import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";

export default function RadioButton(props) {
  const { name, label, options, ...rest } = props;

  return (
    <>
      <FormControl>
        <FormLabel component="legend" size="small">
          {label}
        </FormLabel>
        <Field as={RadioGroup} name={name} {...rest} size="small">
          <div className="flex">
            {options.map((option) => (
              <FormControlLabel
                size="small"
                key={option.key}
                id={option.value}
                value={option.value}
                control={<Radio size="small"/>}
                label={option.key}
              />
            ))}
          </div>
        </Field>
      </FormControl>
     
        <ErrorMessage name={name} component={Error}/>
     
    </>
  );
}
