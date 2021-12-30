import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

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
  const res = await fetch("http://localhost:3000/api/cargoType");
  return res.json();
};
export const Goods = () => {
  const { data, status, refetch } = useQuery("getCargoType", fetchData, {
    refetchOnWindowFocus: true,
  });
  const removeCargoType = useMutation(
    (id: string) => {
      return fetch(`http://localhost:3000/api/cargoType/${id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const navigate = useNavigate();
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
      <Grid container style={btnAddStyle} justify="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/goodsadd")}
        >
          Thêm Loại Hàng Hoá
        </Button>
      </Grid>
      {status === "success" && (
        <Grid container justify="center">
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {["Loại Hàng Hoá", "Hành Động"].map((item: any) => (
                    <TableCell key={item} className={classes.tableHeaderCell}>
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {data.length>0 && 
                <TableBody>
                  {data
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: any) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Grid container>
                            <Grid item lg={10}>
                              <Typography>{row.cargoType}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              navigate(`/dashboard/goodsedit/${row.id}`)
                            }
                            style={{ marginRight: "10px" }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeCargoType.mutate(row.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              }

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
