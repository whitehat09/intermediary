import React, { FunctionComponent as FC } from "react";
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

import { useNavigate } from "react-router";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Formik, Field, Form, FormikProps, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  handleChange: any;
}
export const SignUp: FC<Props> = ({ handleChange }) => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "0px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0" };
  const textColorError = { color: "red" };
  let firstvalue = {
    email: "",
    password: "",
    accountType: "user",
    name: "",
  };

  const validate = Yup.object().shape({
    email: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      //   .email("Vui lòng nhập tài khoản và mật khẩu hợp lệ !")
      .required("Bắt buộc !"),
    name: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      //   .email("Vui lòng nhập tài khoản và mật khẩu hợp lệ !")
      .required("Bắt buộc !"),
    password: Yup.string()
      .min(6, "Phải có 6 ký tự trở lên")
      .required("Bắt buộc !"),
  });
  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid container justify="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid container justify="center">
            <h2>Đăng ký</h2>
            <Formik
              enableReinitialize
              initialValues={firstvalue}
              validationSchema={validate}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {(
                form: FormikProps<{
                  email: string;
                  password: string;
                  accountType: string;
                  name: string;
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
                    placeholder="nhập tài khoản"
                    name="name"
                    fullWidth
                    required
                    // helperText={<ErrorMessage name="name" />}
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
                    placeholder="nhập tài khoản"
                    name="email"
                    fullWidth
                    required
                    // helperText={<ErrorMessage name="email" />}
                  />

                  {/* {form.touched.email && form.errors.email && (
                    <Typography color="secondary">
                      {form.errors.email}
                    </Typography>
                  )} */}
                  <ErrorMessage
                    name="password"
                    render={(message) => (
                      <Box style={{ color: "red" }}>{message}</Box>
                    )}
                  />
                  <Field
                    as={TextField}
                    label="Mật khẩu"
                    placeholder="nhập mật khẩu"
                    name="password"
                    type="password"
                    fullWidth
                    required
                    // helperText={<ErrorMessage name="password" />}
                  />
                  {/* {form.touched.password && form.errors.password && (
                    <Typography color="secondary">
                      {form.errors.email}
                    </Typography>
                  )} */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                  >
                    Đăng ký
                  </Button>
                </Form>
              )}
            </Formik>

            <Typography>
              Bạn đã có tài khoản ?
              <Link href="#" onClick={() => handleChange("event", 0)}>
                Đăng nhập
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
