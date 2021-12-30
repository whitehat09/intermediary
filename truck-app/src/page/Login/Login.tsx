import { FunctionComponent as FC, useEffect } from "react";
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
import { getUser } from "../../features/user/userSlice";
import { TextFieldComponent } from "../../components/TextFieldComponent/TextFieldComponent";
interface Props {
  handleChange: any;
}
export const Login: FC<Props> = ({ handleChange }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    dispatch({
      type: getUser.type,
    });
  }, [dispatch]);

  const { isLoginAdmin, isLoginUser } = useAppSelector((state: RootState) => {
    return state.authReducer;
  });

  useEffect(() => {
    if (isLoginAdmin) {
      navigate("/dashboard");
    } else if (isLoginUser) {
      navigate("/home");
    }
  }, [isLoginAdmin, navigate, dispatch, isLoginUser]);
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
                  user.filter((item: any) => {
                    if (
                      item.email === values.email &&
                      item.password === values.password
                    ) {
                      dispatch({ type: signIn.type, payload: values });

                      localStorage.setItem("currentUsers", values.email);
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
