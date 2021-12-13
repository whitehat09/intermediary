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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, FormikProps, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { signIn, signInAdmin } from "../../features/auth/authSlice";

interface Props {
  handleChange: any;
}
export const Login: FC<Props> = ({ handleChange }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoginAdmin } = useAppSelector((state: RootState) => {
    return state.authReducer;
  });

  useEffect(() => {
    if (isLoginAdmin) {
      navigate("/dashboard");
    }
  }, [isLoginAdmin, navigate, dispatch]);
  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "0px auto",
    height: "70vh",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0" };

  let firstvalue = {
    email: "",
    password: "",
  };

  const validate = Yup.object().shape({
    email: Yup.string()
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
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid container justify="center">
            <h2>Đăng nhập</h2>
            <Formik
              enableReinitialize
              initialValues={firstvalue}
              validationSchema={validate}
              onSubmit={(values) => {
                if (values.email === "admin" && values.password === "123123") {
                  alert("đây là tài khoản admin");
                  dispatch({ type: signInAdmin.type, payload: values });
                } else {
                  alert("đây  không là tài khoản admin");
                }
                alert(JSON.stringify(values, null, 2));
                // dispatch({ type: signIn.type, payload: values });
              }}
            >
              {(
                form: FormikProps<{
                  email: string;
                  password: string;
                }>
              ) => (
                <Form>
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
                    Đăng nhập
                  </Button>
                </Form>
              )}
            </Formik>

            <Typography>
              Bạn đã có tài khoản chưa ?
              <Link href="#" onClick={() => handleChange("event", 1)}>
                Đăng ký
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
