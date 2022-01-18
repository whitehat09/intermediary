import { Grid } from "@material-ui/core";
 
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import cargoTypeApi from "../../api/cargoTypeApi";
import { TableI } from "../../components/TableI/TableI";



export const Goods = () => {
  const { data, status, refetch } = useQuery(
    "getCargoType",
    cargoTypeApi.read,
    {
      refetchOnWindowFocus: true,
    }
  );
  const { mutate } = useMutation(cargoTypeApi.delete, {
    onSuccess: () => {
      refetch();
    },
  });
  const navigate = useNavigate();
  const btnAddStyle = {
    marginTop: "20px",
  };
  const editCargoType = (id: string) => {
    navigate(`/dashboard/goodsedit/${id}`);
  };
  const removeCargoType = (id: string) => {
    mutate(id);
  };
  const dataTable = {
    data: data,
    column: ["Loại Hàng Hoá", "Hành Động"],
    row: ["cargoType"],
    actionTable: true,
  };
  return (
    <>
      {status === "loading" && <div>Đang tải dữu liệu </div>}
      {status === "error" && <div>lỗi khi tìm nạp dữ liệu </div>}
      <Grid container style={btnAddStyle} justifyContent="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/goodsadd")}
        >
          Thêm Loại Hàng Hoá
        </Button>
      </Grid>
      {data && (
        <TableI
          dataTable={dataTable}
          funDelete={removeCargoType}
          funEdit={editCargoType}
        />
      )}
    </>
  );
};
