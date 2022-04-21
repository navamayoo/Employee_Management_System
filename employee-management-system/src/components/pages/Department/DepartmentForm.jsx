import React, { useState,useEffect } from 'react';
import { Formik,Form } from 'formik';
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import Control from "../../controls/Control";
import DepartmentService from '../../service/DepartmentService';

export default function DepartmentForm({departmentCode, loading, setLoading,setFormSubmitted}) {

  //const [loading, setLoading]=useState();


  const initValues = {
    name:"",
    description:""
  }

  const [formValues, setFormValues] = useState(initValues);


  const validationSchema = Yup.object({
    name:Yup.string().required("Required"),
    description:Yup.string().required("Required"),
  });

  const handelSubmit = async (values) => {
    if (validationSchema) {
      if (departmentCode) {
        await DepartmentService.update(departmentCode, values).then((response) => {
          console.log("update");
        });
      } else {
        await DepartmentService.create(values).then((response) => {
          console.log("crete");
        });
      }
    }
     setFormSubmitted((prev) => prev + 1);
  };

  useEffect(() => {
    if (departmentCode != null) {
      getDepartmentByCode(departmentCode);
    } else {
      setLoading(true);
    }
  }, [departmentCode]);
  
  const getDepartmentByCode = async (code) => {
    await DepartmentService.getByCode(code)
      .then((response) => {
        setFormValues(response.course);
        setLoading(true);
        console.log("from data", response.course);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (

    <>
    <Formik
    initialValues={formValues}
    validationSchema={validationSchema}
    onSubmit={async(values,onSubmitPros)=>{
      await handelSubmit(values);
      onSubmitPros.resetForm();
    }}

    >
      {()=>(
        <Form>
         <Box sx={{ flexGrow: 1 }} spacing={2}>
         <Grid container spacing={2}>
           <Grid item xs={6}>
             <Control.Input name="name" label="Department Name" />
           </Grid>
           <Grid item xs={6}>
             <Control.Input name="description" label="Description" />
                  </Grid>
           </Grid>
           <Grid item xs={4}>
                    <Control.Button type="submit" text="Submit" color="success"/>
                    <Control.Button type="reset" text="Reset" />
                  </Grid>
           </Box>
           </Form>
      )}

    </Formik>

    </>


  );
}
