import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Box } from "@mui/material";
import Control from "../../components/controls/Control";
import DepartmentService from "../../service/DepartmentService";

export default function DepartmentForm({
  departmentId,
  loading,
  setLoading,
  setFormSubmitted,
  setCode,
  setPopupClose
}) {
  //const [loading, setLoading]=useState();

  const initValues = {
    departmentName: "",
  };

  const [formValues, setFormValues] = useState(initValues);

  const validationSchema = Yup.object({
    departmentName: Yup.string().required("Required"),
  });

  const handelSubmit = async (values) => {
    if (validationSchema) {
      if (departmentId) {
        await DepartmentService.update(departmentId, values).then(
          (response) => {
            console.log("update");
            setPopupClose(false);
            setCode();
            
          }
        );
      } else {
        await DepartmentService.create(values).then((response) => {
          console.log("crete");
          setPopupClose(false);
        });
      }
    }
    setFormSubmitted((prev) => prev + 1);
  };

  useEffect(() => {
    if (departmentId != null) {
      getDepartmentByCode(departmentId);
    } else {
      setLoading(true);
    }
  }, [departmentId]);

  const getDepartmentByCode = async (departmentId) => {
    await DepartmentService.getByCode(departmentId)
      .then((response) => {
        setFormValues(response);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log("form-Values", formValues);

  return (
    <>
      {loading ? (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, onSubmitPros) => {
            await handelSubmit(values);
            onSubmitPros.resetForm();
          }}
        >
          {() => (
            <Form>
              <Box sx={{ flexGrow: 1 }} spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Control.Input
                      name="departmentName"
                      label="Department Name"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Control.Button type="submit" text="Submit" color="success" />
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
