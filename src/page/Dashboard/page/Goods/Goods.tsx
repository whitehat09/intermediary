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

import {
  deleteCargoType,
  getCargoType,
} from "../../../../features/cargoType/cargoTypeSlice";
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

export const Goods = () => {
  const { cargoType } = useAppSelector(
    (state: RootState) => state.cargoTypeReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getCargoType.type,
    });
  }, [dispatch, cargoType]);

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
    let newDataTable = cargoType;

    return newDataTable;
  }, [cargoType]);
  const navigate = useNavigate();
  const classes = useStyles();
  const btnAddStyle = {
    marginTop: "20px",
  };
  console.log("cargoType.length", cargoType.length);
  return (
    <>
      <Grid container style={btnAddStyle} justify="center">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/goodsadd")}
        >
          Thêm loại hàng hoá
        </Button>
      </Grid>

      <Grid container justify="center">
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Loại hành hoá
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
                  <TableRow key={row.id}>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={10}>
                          <Typography>{row.cargoType}</Typography>
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
                          navigate(`/dashboard/goodsedit/${row.id}`)
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
                          dispatch({
                            type: deleteCargoType.type,
                            payload: row.id,
                          });
                          dispatch({
                            type: getCargoType.type,
                            payload: row.id,
                          });
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
                  count={cargoType.length}
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
