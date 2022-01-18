import {
  Grid
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import usersApi from "../../api/usersApi";
import { TableI } from "../../components/TableI/TableI";


export const Users = () => {
  const navigate = useNavigate();
  const { data, status, refetch } = useQuery("getUser", usersApi.read, {
    refetchOnWindowFocus: true,
  });
  const { mutate } = useMutation(usersApi.delete, {
    onSuccess: () => {
      refetch();
    },
  });
  const editUser = (id: string) => {
    navigate(`/dashboard/useredit/${id}`);
  };
  const removeUser = (id: string) => {
    mutate(id);
  };
  
  const dataTable = {
    data: data,
    column: ["Người Lái Xe", "Tài Khoản", "Mật Khẩu", "Hành Động"],
    row: ["name", "email", "password"],
    actionTable: true,
  };
  const btnAddStyle = {
    marginTop: "20px",
  };
  return (
    <>
      {status === "loading" && <div>Đang tải dữu liệu </div>}
      {status === "error" && <div>lỗi khi tìm nạp dữ liệu </div>}
      <Grid container style={btnAddStyle} justifyContent="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/useradd")}
        >
          Thêm Tài Xế
        </Button>
      </Grid>
      {data && (
        <TableI
          dataTable={dataTable}
          funDelete={removeUser}
          funEdit={editUser}
        />
      )}
    </>
  );
};
