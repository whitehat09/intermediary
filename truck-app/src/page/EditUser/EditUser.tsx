import { Avatar, Button, Grid } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Form, Formik, FormikProps } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import usersApi from "../../api/usersApi";
import { TextFieldComponent } from "../../components/TextFieldComponent/TextFieldComponent";



export const EditUser = () => {
  let { id }: any = useParams();
  const { data, status } = useQuery("getUserItem", () => usersApi.readItem(id));

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
  const { mutate } = useMutation(usersApi.update);
  const editUser = (value: any) => {
    mutate(value);
  };
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
                editUser(values);
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
