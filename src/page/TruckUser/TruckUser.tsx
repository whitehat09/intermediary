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

import { useState, useMemo, useEffect } from "react";
import { QueryClient, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getTruck } from "../../features/truck/truckSlice";
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

const fetchData = async () => {
  const res = await fetch(
    "https://61b7085ac95dd70017d411a2.mockapi.io/truck/api/truck"
  );
  return res.json();
};
export const TruckUser = () => {
  const { data, status } = useQuery("repoData", fetchData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();
  const btnAddStyle = {
    marginTop: "20px",
  };
  return (
    <>
      {status === "loading" && <div>Đang tải dữu liệu </div>}
      {status === "error" && <div>lỗi khi tìm nạp dữ liệu </div>}
      {status === "success" && (
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
                </TableRow>
              </TableHead>
              <TableBody>
                {data
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
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={data.length}
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
        </Grid>
      )}
    </>
  );
};
