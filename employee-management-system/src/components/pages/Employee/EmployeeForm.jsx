import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Control from "../../controls/Control";
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import EmployeeService from "../../service/EmployeeService";



export default function EmployeeForm({ employeeCode, loading, setLoading,setFormSubmitted }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    age:"",
    salary: "",
    department:""
  };
  const [form, setForm] = useState(initialValues);
  const [getDate, setGetDate] = useState(form.dob);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Format").required("Required!"),
    dob: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    salary: Yup.number()
      .min(9, "Must be more than 10 characters")
      .required("Required"),
  });

  const handelSubmit = async (values) => {
    if (validationSchema) {
      if (employeeCode) {
        await EmployeeService.update(employeeCode, values).then((response) => {
          console.log("update");
        });
      } else {
        await EmployeeService.create(values).then((response) => {
          console.log("crete");
        });
      }
    }
     setFormSubmitted((prev) => prev + 1);
  };

  useEffect(() => {
    if (employeeCode != null) {
      getStudentByCode(employeeCode);
    } else {
      setLoading(true);
    }
  }, [employeeCode]);
  

  const getStudentByCode = async (code) => {
    await EmployeeService.getByCode(code)
      .then((response) => {
        setForm(response.student);
        setLoading(true);
        console.log("from data", response.student);
      })
      .catch((e) => {
        console.log(e);
      });
  };

//   function getAge(event) 
// {
//     var today = new Date();
//     var birthDate = new Date(event.target.value);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
//     {
//         age--;
//     }
 
//     return age;
//     console.log(age);
// }

//console.log(getDate);


  const today = new Date().toISOString().split("T")[0];
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

                  
                  <Grid item xs={4}>
                    <Control.Input
                      type="date"
                      label="Date Of Birth"
                      name="dob"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: today,
                      }}
                      // onChange={getAge}
                    />
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Control.Input name="salary" label="Salary" />
                  </Grid>
                  <Grid item xs={4}>
                    {/* <Control.SelectInput name="salary" label="Salary" /> */}
                  </Grid>

                  <Grid item xs={4}>
                    <Control.Button type="submit" text="Submit" color="success"/>
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
