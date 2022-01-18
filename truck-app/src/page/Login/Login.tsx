import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { FunctionComponent as FC } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import usersApi from "../../api/usersApi";
import { TextFieldComponent } from "../../components/TextFieldComponent/TextFieldComponent";

interface Props {
  handleChange: any;
}
export const Login: FC<Props> = ({ handleChange }) => {
  const navigate = useNavigate();

  const { data: users } = useQuery("getUser", usersApi.read, {
    refetchOnWindowFocus: true,
  });
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
      .required("Bắt buộc !"),
    password: Yup.string()
      .min(6, "Phải có 6 ký tự trở lên")
      .required("Bắt buộc !"),
  });
  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid container justifyContent="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid container justifyContent="center">
            <h2>Đăng nhập</h2>
            <Formik
              enableReinitialize
              initialValues={firstvalue}
              validationSchema={validate}
              onSubmit={(values) => {
                if (values.email === "admin" && values.password === "123123") {
                  alert("đây là tài khoản admin");
                  navigate("/dashboard");
                  localStorage.setItem("isAdmin", "admin");
                } else {
                  alert("đây  không là tài khoản admin");
                  users.filter((item: any) => {
                    if (
                      item.email === values.email &&
                      item.password === values.password
                    ) {
                      localStorage.setItem("isUser", values.email);
                      navigate("/home");
                    }
                  });
                }
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {(
                form: FormikProps<{
                  email: string;
                  password: string;
                }>
              ) => (
                <Form>
                  <TextFieldComponent
                    fieldName={"email"}
                    fullWidth={true}
                    required={true}
                    label={"Tài Khoản"}
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
                    placeholder="nhập mật khẩu"
                    name="password"
                    type="password"
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
