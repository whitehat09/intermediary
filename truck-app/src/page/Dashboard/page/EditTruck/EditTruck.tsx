import { Avatar, Button, Grid } from "@material-ui/core";
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

export const EditTruck = () => {
  let { id }: any = useParams();
  const queryClient = useQueryClient();
  const { data, status, refetch } = useQuery("getTruck", async () => {
    const res = await fetch(`http://localhost:3000/api/truck/${id}`);
    return res.json();
  });
  const { data: cargoType } = useQuery("getCargoType", async () => {
    const res = await fetch(`http://localhost:3000/api/cargoType`);
    return res.json();
  });
  const { data: user } = useQuery("getUser", async () => {
    const res = await fetch(`http://localhost:3000/api/user`);
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
    truckPlate: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),

    driver: Yup.string()
      .max(25, "Phải có 25 ký tự trở xuống")
      .required("Bắt buộc !"),
  });
  const editTruck = useMutation(
    (value: any) => {
      return axiosClient.patch(`/truck/${id}`, value);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getTrucks"); // load lại key
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
              editTruck.mutate(values);
            
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
                <TextFieldComponent
                  fieldName={"truckPlate"}
                  fullWidth={true}
                  required={true}
                  label={"Biển Số Xe"}
                />

                <AutoCompleteCargoType
                  fieldName={"cargoType"}
                  fullWidth={true}
                  required={true}
                  label={"Danh Mục Hàng Hoá"}
                  data={cargoType}
                />

                <AutoCompleteUser
                  fieldName={"driver"}
                  fullWidth={true}
                  required={true}
                  label={"Tài Xế"}
                  data={user}
                />
                <TextFieldComponent
                  fieldName={"truckType"}
                  fullWidth={true}
                  required={true}
                  label={"Loại xe"}
                />
                <TextFieldComponent
                  fieldName={"price"}
                  fullWidth={true}
                  required={true}
                  label={"Giá Bán"}
                />
                <TextFieldComponent
                  fieldName={"dimenSion"}
                  fullWidth={true}
                  required={true}
                  label={"Kích Thước"}
                />
               
                <TextFieldComponent
                  fieldName={"parkingAddress"}
                  fullWidth={true}
                  required={true}
                  label={"Địa Chỉ Đỗ Xe"}
                />
                <TextFieldComponent
                  fieldName={"productionYear"}
                  fullWidth={true}
                  required={true}
                  label={"Năm Sản Xuất"}
                />
                <TextFieldComponent
                  fieldName={"Status"}
                  fullWidth={true}
                  required={true}
                  label={"Trạng Thái"}
                />
                <TextFieldComponent
                  fieldName={"description"}
                  fullWidth={true}
                  required={true}
                  label={"Miêu Tả"}
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
