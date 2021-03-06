import { Avatar, Button, Grid } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Field, Form, Formik, FormikProps } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import cargoTypeApi from "../../api/cargoTypeApi";
import truckApi from "../../api/truckApi";
import usersApi from "../../api/usersApi";
import { FormikAutocomplete } from "../../components/FormikAutocomplete/FormikAutocomplete";
import { TextFieldComponent } from "../../components/TextFieldComponent/TextFieldComponent";

export const EditTruck = () => {
  let { id }: any = useParams();

  const { data, status } = useQuery("getTruckItem", () =>
    truckApi.readItem(id)
  );
  const { data: cargoType } = useQuery("getCargoType", cargoTypeApi.read);
  const { data: user } = useQuery("getUser", usersApi.read);
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
  const { mutate } = useMutation(truckApi.update);
  const editTruck = (value: any) => {
    mutate(value);
  };
  let cargoTypeOption = cargoType?.map((item: any) => {
    return { value: item?.cargoType, label: item?.cargoType, isFixed: true };
  });
  let userOption = user?.map((item: any) => {
    return { value: item?.name, label: item?.name, isFixed: true };
  });
  return (
    <>
      {status === "loading" && <div>Đang tải dữu liệu </div>}
      {status === "error" && <div>lỗi khi tìm nạp dữ liệu </div>}
      {status === "success" && (
        <Grid style={paperStyle}>
          <Grid container justifyContent="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid container justifyContent="center">
            <Formik
              enableReinitialize
              initialValues={data}
              validationSchema={validate}
              onSubmit={(values) => {
                editTruck(values);

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

                  <Field
                    name="cargoType"
                    component={FormikAutocomplete}
                    options={cargoTypeOption}
                    fullWidth
                    label="Danh Mục Hàng Hoá"
                    Multi={true}
                  />
                  <Field
                    name="driver"
                    component={FormikAutocomplete}
                    options={userOption}
                    fullWidth
                    label="Tài Xế"
                    Multi={false}
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
      )}
    </>
  );
};
