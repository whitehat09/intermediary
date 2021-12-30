import { Avatar, Button, Grid } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import { TextFieldComponent } from "../../../../components/TextFieldComponent/TextFieldComponent";

export const AddGoods = () => {
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
    cargoType: "",
  };

  const validate = Yup.object().shape({
    cargoType: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),
  });
  const addCargoType = useMutation(
    (value: any) => {
      return axiosClient.post(`/cargoType`, value);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getCargoType"); // load lại key
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
              addCargoType.mutate(values);

              navigate("/dashboard/goods");
            }}
          >
            {(
              form: FormikProps<{
                cargoType: string;
              }>
            ) => (
              <Form>
                <TextFieldComponent
                  fieldName={"cargoType"}
                  fullWidth={true}
                  required={true}
                  label={"Loại Hàng Hoá"}
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Thêm Loại Hàng Hoá
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};
