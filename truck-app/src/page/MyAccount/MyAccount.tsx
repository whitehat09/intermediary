import React from "react";
import { useQuery } from "react-query";
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
  Avatar,
  Box,
} from "@material-ui/core";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const fetchData = async () => {
  const res = await fetch(
    "http://localhost:3000/api/user"
  );
  return res.json();
};
export const MyAccount = () => {
  const { data, status } = useQuery("getUser", fetchData);
  const emailUser = localStorage.getItem("currentUsers");
  const dataUsers = data?.filter((item: any) => item.email === emailUser);
  console.log(dataUsers);
  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "0px auto",
    height: "70vh",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
    marginTop: "50px",
    marginBottom: "50px",
  };
  return (
    <>
      {status === "loading" && <div>Đang tải dữu liệu </div>}
      {status === "error" && <div>lỗi khi tìm nạp dữ liệu </div>}
      {status === "success" && (
        <Grid>
          {/* <Paper style={paperStyle}> */}
          <Grid container justify="center">
            <Avatar style={avatarStyle}>
              <AccountCircleIcon />
            </Avatar>
          </Grid>
          <Grid container justify="center">
            <Box>
              <Typography>Tên người dùng : {dataUsers[0]?.name}</Typography>
              <Typography>Email : {dataUsers[0]?.email}</Typography>
            </Box>
          </Grid>
          {/* </Paper> */}
        </Grid>
      )}
    </>
  );
};
