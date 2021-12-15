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

export const AddTruck = () => {
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
    truckPlate: "",
    cargoType: "",
    driver: "",
    truckType: "",
    price: "",
    dimenSion: "",
    parkingAddress: "",
    productionYear: "",
    Status: "",
    description: "",
    id: Date.now(),
  };

  const validate = Yup.object().shape({
    truckPlate: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),

    driver: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),
    // truckType: Yup.string()
    //   .max(25, "Phải có 25 ký tự trở xuống")
    //   .required("Bắt buộc !"),
    // price: Yup.number()
    //   .max(25, "Phải có 25 ký tự trở xuống")
    //   .required("Bắt buộc !"),
    // dimenSion: Yup.string()
    //   .max(25, "Phải có 25 ký tự trở xuống")
    //   .required("Bắt buộc !"),
    // parkingAddress: Yup.string()
    //   .max(25, "Phải có 25 ký tự trở xuống")
    //   .required("Bắt buộc !"),
    // productionYear: Yup.number().required("Bắt buộc !"),
    // Status: Yup.string()
    //   .max(25, "Phải có 25 ký tự trở xuống")
    //   .required("Bắt buộc !"),
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
          <h2>thêm thông tin xe</h2>
          <Formik
            enableReinitialize
            initialValues={firstvalue}
            validationSchema={validate}
            onSubmit={(values) => {
              dispatch({ type: addTruck.type, payload: values });
              alert(JSON.stringify(values, null, 2));
              navigate("/dashboard/truck");
            }}
          >
            {(
              form: FormikProps<{
                truckPlate: string;
                cargoType: string;
                driver: string;
                truckType: string;
                price: string;
                dimenSion: string;
                parkingAddress: string;
                productionYear: string;
                Status: string;
                description: string;
                id: any;
              }>
            ) => (
              <Form>
                <ErrorMessage
                  name="truckPlate"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Biển số xe"
                  placeholder="Nhập biển số"
                  name="truckPlate"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="cargoType"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Danh mục hàng hoá"
                  placeholder="Nhập danh mục hành hoá"
                  name="cargoType"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="driver"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Tài xế"
                  placeholder="Nhập tài xế"
                  name="driver"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="truckType"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="loại xe"
                  placeholder="Nhập loại"
                  name="truckType"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="price"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Giá bán"
                  placeholder="Nhập giấ bán"
                  name="price"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="dimenSion "
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Kích thước"
                  placeholder="Nhập kích thước"
                  name="dimenSion "
                  fullWidth
                  required
                />

                <ErrorMessage
                  name="parkingAddress "
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Địa chỉ đỗ xe"
                  placeholder="Nhập địa chỉ đỗ xe"
                  name="parkingAddress "
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="productionYear"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Năm sản xuất"
                  placeholder="Nhập năm sản xuất"
                  name="productionYear"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="Status"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Trạng thái"
                  placeholder="Nhập trạng thái"
                  name="Status"
                  fullWidth
                  required
                />
                <ErrorMessage
                  name="description"
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
                <Field
                  as={TextField}
                  label="Miêu tả"
                  placeholder="Nhập miêu tả"
                  name="description"
                  fullWidth
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
        {/* </Paper> */}
      </Grid>
    </>
  );
};
