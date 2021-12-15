import React, { FunctionComponent as FC, useEffect } from "react";
import {
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, FormikProps, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../../app/hooks";
import { addTruck } from "../../../../features/truck/truckSlice";
import { addCargoType } from "../../../../features/cargoType/cargoTypeSlice";

export const AddGoods = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "0px auto",
    height: "70vh",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0" };

  let firstvalue = {
    cargoType: "",

    id: Date.now(),
  };

  const validate = Yup.object().shape({
    cargoType: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),
  });
  return (
    <>
      <Grid style={paperStyle}>
        {/* <Paper style={paperStyle}> */}
        <Grid container justify="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid container justify="center">
          <h2>Thêm loại hàng hoá</h2>
          <Formik
            enableReinitialize
            initialValues={firstvalue}
            validationSchema={validate}
            onSubmit={(values) => {
              dispatch({ type: addCargoType.type, payload: values });
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {(
              form: FormikProps<{
                cargoType: string;

                id: any;
              }>
            ) => (
              <Form>
                <ErrorMessage
                  name="cargoType"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Loại hàng"
                  placeholder="Nhập loại hàng"
                  name="cargoType"
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Thêm loại hàng hoá
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
        {/* </Paper> */}
      </Grid>
    </>
  );
};
