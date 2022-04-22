import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Control from "../../components/controls/Control";
import * as Yup from "yup";
import { Grid, Box, Stack, TextField } from "@mui/material";
import EmployeeService from "../../service/EmployeeService";
import DepartmentService from "../../service/DepartmentService";
// import { AdapterDateFns } from "@mui/lab/AdapterDateFns";
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab";

export default function EmployeeForm({
  employeeCode,
  loading,
  setLoading,
  setFormSubmitted,
  setCode,
  setPopupClose
}) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    age: 0,
    salary: "",
    departmentId: "",
  };

  const [form, setForm] = useState(initialValues);
  const [departments, setDepartments] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const [age, setAge] = useState(null);



  //console.log("selectDate",new Date(selectDate).toISOString())
  //console.log("selectDate_",initialValues.dateOfBirth);
  const _today = new Date().toISOString().split("T")[0];
  //console.log("today",_today);
  const _newDate = new Date(selectDate).getFullYear();

  //console.log(_newDate);


  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Format").required("Required!"),
    dateOfBirth: Yup.string().required("Required"),
    departmentId: Yup.string().required("Required"),
    salary: Yup.number()
      .min(9, "Must be more than 10 characters")
      .required("Required"),
  });

  const handelSubmit = async (values) => {
    try{
      if (validationSchema) {
        if (employeeCode) {
          await EmployeeService.update(employeeCode, values).then((response) => {
            console.log("update");
            setPopupClose(false);
              setCode();
          });
        } else {
          await EmployeeService.create(values).then((response) => {
            console.log("crete");
            setPopupClose(false);
              
          });
        }
      }
      setFormSubmitted((prev) => prev + 1);

    }catch(e){
      alert(e);
    }

  };

  // const handleDateChange = () => {
  //   const _selectDate = new Date(selectDate).getFullYear();
  //   const today = new Date().getFullYear();
  //   const _age = today - _selectDate;
  //   setAge(_age);
  // };

  const getEmployeeByCode = async (code) => {
    await EmployeeService.getByCode(code)
      .then((response) => {
        setForm(response);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getDepartment = async () => {
    await DepartmentService.getAll()
      .then((response) => {
        setDepartments(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDepartment();
    if (employeeCode != null) {
      getEmployeeByCode(employeeCode);
    } else {
      setLoading(true);
    }
  }, [employeeCode]);

  return (
    <>
      {loading ? (
        <Formik
          initialValues={form}
          validationSchema={validationSchema}
          onSubmit={async (values, onSubmitProps) => {
            await handelSubmit(values);
            onSubmitProps.resetForm();
          }}
        >
          {() => (
            <Form>
              <Box sx={{ flexGrow: 1 }} spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Control.Input name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={6}>
                    <Control.Input name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <Control.Input name="email" label="Email" />
                  </Grid>

                  <Grid item xs={6}>
                    <Control.Input
                      type="date"
                      label="Date Of Birth"
                      name="dateOfBirth"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: _today,
                      }}
                      
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DatePicker
                          disableFuture
                          label="Date Of Birth"
                          openTo="year"
                          name="dateOfBirth"
                          inputFormat="dd/MM/yyyy"
                          views={["year", "month", "day"]}
                          value={selectDate}
                          onChange={(newValue) => {
                            setSelectDate(newValue);
                            handleDateChange();
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            max: _today,
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider> */}
                  </Grid>
                  <Grid item xs={6}>
                    <h5>Age: {age}</h5>
                  </Grid>

                  <Grid item xs={6}>
                    <Control.Input name="salary" label="Salary" />
                  </Grid>
                  <Grid item xs={6}>
                    <Control.SelectInput
                      label="Department"
                      options={departments}
                      name="departmentId"
                      //onChange={handleDataChange}
                    />
                  </Grid>

                  <Grid>
                    <Control.Button
                      type="submit"
                      text="Submit"
                      color="success"
                    />
                    <Control.Button type="reset" text="Reset" />
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      ) : (
        "Loading"
      )}
    </>
  );
}
