import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Selects = (props) => {
  const { label,options, ...rest } = props;
  return (
    <FormControl variant="outlined"  sx={{ minWidth: 270 }} size="small">
      <InputLabel >{label}</InputLabel>
      <Select {...rest}>
        {options &&
          options.map((option, index) => (
            <MenuItem key={index} value={option.departmentId}>
              {option.departmentName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default Selects;
