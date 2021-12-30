import { Avatar, Button, Grid } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import { TextFieldComponent } from "../../../../components/TextFieldComponent/TextFieldComponent";

export const AddUser = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
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
  const addTruck = useMutation(
    (value: any) => {
      return axiosClient.post(`/user`, value);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUser"); // load lại key
      },
    }
  );
  return (
    <>
      <Grid style={paperStyle}>
        <Grid container justify="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid container justify="center">
          <Formik
            enableReinitialize
            initialValues={firstvalue}
            validationSchema={validate}
            onSubmit={(values) => {
              addTruck.mutate(values);
            
              navigate("/dashboard/user");
            }}
          >
            {(
              form: FormikProps<{
                name: string;
                email: string;
                password: string;
              }>
            ) => (
              <Form>
                <TextFieldComponent
                  fieldName={"name"}
                  fullWidth={true}
                  required={true}
                  label={"Tên Người Lái"}
                />

                <TextFieldComponent
                  fieldName={"email"}
                  fullWidth={true}
                  required={true}
                  label={"Tài Khoản"}
                />
                <TextFieldComponent
                  fieldName={"password"}
                  fullWidth={true}
                  required={true}
                  label={"Mật Khẩu"}
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Thêm thông tin
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};
