import { Avatar, Button, Grid, TextField } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import { AutoCompleteCargoType } from "../../../../components/AutoCompleteCargoType/AutoCompleteCargoType";
import { AutoCompleteUser } from "../../../../components/AutoCompleteUser/AutoCompleteUser";
import { TextFieldComponent } from "../../../../components/TextFieldComponent/TextFieldComponent";

export const EditGoods = () => {
  let { id }: any = useParams();
  const queryClient = useQueryClient();
  const { data, status, refetch } = useQuery("getCargoType", async () => {
    const res = await fetch(`http://localhost:3000/api/cargoType/${id}`);
    return res.json();
  });

  const navigate = useNavigate();
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
  const editCargoType = useMutation(
    (value: any) => {
      return axiosClient.patch(`/cargoType/${id}`, value);
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
            initialValues={data}
            validationSchema={validate}
            onSubmit={(values) => {
              editCargoType.mutate(values);

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
                  Sửa thông tin
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};
