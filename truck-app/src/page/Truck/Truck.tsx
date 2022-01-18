import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import truckApi from "../../api/truckApi";
import { TableI } from "../../components/TableI/TableI";

export const Truck = () => {
  const { data, status, refetch } = useQuery("getCargoType", truckApi.read, {
    refetchOnWindowFocus: true,
  });
  const { mutate } = useMutation(truckApi.delete, {
    onSuccess: () => {
      refetch();
    },
  });

  const navigate = useNavigate();
  const btnAddStyle = {
    marginTop: "20px",
  };
  const removeTruck = (id: string) => {
    mutate(id);
  };
  const editTruck = (id: string) => {
    navigate(`/dashboard/truckedit/${id}`);
  };

  const dataTable = {
    data: data,
    column: [
      "Biển Xe Tải",
      "Loại Hàng Hoá",
      "Người Lái Xe",
      "Loại Xe Tải",
      "Giá Bán",
      "Kích Thước(LWH)",
      "Địa Chỉ Bãi Đậu Xe",
      "Năm Sản Xuất",
      "Trạng Thái",
      "Sự Miêu Tả",
      "Hành Động",
    ],
    row: [
      "truckPlate",
      "cargoType",
      "driver",
      "truckType",
      "price",
      "dimenSion ",
      "parkingAddress ",
      "productionYear",
      "Status",
      "description",
    ],
    actionTable: true,
  };
  return (
    <>
      {status === "loading" && <div>Đang tải dữu liệu </div>}
      {status === "error" && <div>lỗi khi tìm nạp dữ liệu </div>}

      <Grid container style={btnAddStyle} justifyContent="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/truckadd")}
        >
          Thêm thông tin xe
        </Button>
      </Grid>
      {data && (
        <TableI
          dataTable={dataTable}
          funDelete={removeTruck}
          funEdit={editTruck}
        />
      )}
    </>
  );
};
