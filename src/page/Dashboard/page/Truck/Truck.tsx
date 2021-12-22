import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import Button from "@mui/material/Button";

import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { deleteTruck, getTruck } from "../../../../features/truck/truckSlice";
import { useNavigate } from "react-router-dom";
import Chart from "../../../../components/Chart/Chart";
import PieChart from "../../../../components/PieChart/PieChart";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

export const Truck = () => {
  const { truck } = useAppSelector((state: RootState) => state.truckReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: getTruck.type,
    });
  }, [dispatch, truck]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const currentDataTable = useMemo(() => {
    let newDataTable = truck;

    return newDataTable;
  }, [truck]);

  const classes = useStyles();
  const btnAddStyle = {
    marginTop: "20px",
  };
  return (
    <>
      <Grid container style={btnAddStyle} justify="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/truckadd")}
        >
          Thêm thông tin xe
        </Button>
      </Grid>

      <Grid container justify="center">
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Biển xe tải
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Loại hàng hoá
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Người lái xe
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Loại xe tải
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Giá bán
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Kích thước (LWH)
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Địa chỉ bãi đậu xe
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Năm sản xuất
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Trạng thái
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Sự miêu tả
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {truck
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{row.truckPlate}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row?.cargoType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.driver}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.truckType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.dimenSion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.parkingAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.productionYear}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.Status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="subtitle2">
                        {row.description}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        className={classes.status}
                        style={{
                          backgroundColor: "green",
                          marginRight: "5px",
                        }}
                        onClick={() =>
                          navigate(`/dashboard/truckedit/${row.id}`)
                        }
                      >
                        Sửa
                      </Typography>
                      <Typography
                        className={classes.status}
                        style={{
                          backgroundColor: "red",
                        }}
                        onClick={() => {
                          dispatch({ type: deleteTruck.type, payload: row.id });
                          dispatch({ type: getTruck.type, payload: row.id });
                        }}
                      >
                        Xoá
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={truck.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Chart />
        <PieChart />
      </Grid>
    </>
  );
};
