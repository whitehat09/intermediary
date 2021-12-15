import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { getTruck } from "../../../../features/truck/truckSlice";
import { deleteUser, getUser } from "../../../../features/user/userSlice";
import Button from "@mui/material/Button";
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

export const Users = () => {
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getUser.type,
    });
  }, [dispatch, user]);
  console.log(user);
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
    let newDataTable = user;

    return newDataTable;
  }, [user]);

  const classes = useStyles();
  const navigate = useNavigate();

  const btnAddStyle = {
    marginTop: "20px",
  };
  return (
    <>
      <Grid container style={btnAddStyle} justify="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/useradd")}
        >
          Thêm thông người dùng
        </Button>
      </Grid>
      <Grid container justify="center">
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Tên người dùng
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Tài khoản
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Mật khẩu
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentDataTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow key={row.productName}>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{row.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{row.email}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{row.password}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Typography
                        className={classes.status}
                        style={{
                          backgroundColor: "green",
                          marginRight: "5px",
                        }}
                        onClick={() =>
                          navigate(`/dashboard/useredit/${row.id}`)
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
                          dispatch({ type: deleteUser.type, payload: row.id });
                          dispatch({ type: getUser.type, payload: row.id });
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
                  count={user.length}
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
    </>
  );
};
