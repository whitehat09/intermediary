import { Avatar, Button, Grid } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Formik, FormikProps } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import cargoTypeApi from "../../api/cargoTypeApi";
import { TextFieldComponent } from "../../components/TextFieldComponent/TextFieldComponent";



export const AddGoods = () => {
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
  const { mutate } = useMutation(cargoTypeApi.create);
  const addCargoType = (value: any) => {
    mutate(value);
  };
  return (
    <>
      <Grid style={paperStyle}>
        <Grid container justifyContent="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid container justifyContent="center">
          <Formik
            enableReinitialize
            initialValues={firstvalue}
            validationSchema={validate}
            onSubmit={(values) => {
              addCargoType(values);

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
