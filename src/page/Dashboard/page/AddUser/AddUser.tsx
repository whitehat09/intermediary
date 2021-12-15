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

import { addCargoType } from "../../../../features/cargoType/cargoTypeSlice";
import { addUser } from "../../../../features/user/userSlice";

export const AddUser = () => {
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
    name: "",
    email: "",
    password: "",
    id: Date.now(),
  };

  const validate = Yup.object().shape({
    name: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),
    email: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),
    password: Yup.string()
      .min(6, "Phải có 6 ký tự trở lên")
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
          <h2>Thêm người dùng</h2>
          <Formik
            enableReinitialize
            initialValues={firstvalue}
            validationSchema={validate}
            onSubmit={(values) => {
              dispatch({ type: addUser.type, payload: values });
              alert(JSON.stringify(values, null, 2));
              navigate("/dashboard/user");
            }}
          >
            {(
              form: FormikProps<{
                name: string;
                email: string;
                password: string;
                id: any;
              }>
            ) => (
              <Form>
                <ErrorMessage
                  name="name"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Tên"
                  placeholder="Nhập tên"
                  name="name"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="email"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Tài khoản"
                  placeholder="Nhập tài khoản"
                  name="email"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="password"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  name="password"
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
                  Thêm người dùng
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
