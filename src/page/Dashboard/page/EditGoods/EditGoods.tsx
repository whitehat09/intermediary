import React, { FunctionComponent as FC, useEffect, useState } from "react";
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
import {
 
  editCargoType,
} from "../../../../features/cargoType/cargoTypeSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
export const EditGoods = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id }: any = useParams();
  const [data, setdata] = useState<any>({});
  useEffect(() => {
    axios(
      `https://61b7085ac95dd70017d411a2.mockapi.io/truck/api/cargoType/${id}`,
      {
        method: "GET",
      }
    )
      .then((data) => {
        console.log(data.data);
        setdata(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "0px auto",
    height: "70vh",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0" };

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
          <h2>Sửa loại hàng hoá</h2>
          <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validate}
            onSubmit={(values) => {
              dispatch({ type: editCargoType.type, payload: values });
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
                  Sửa loại hàng hoá
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
