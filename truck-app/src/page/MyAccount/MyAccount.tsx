import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch("http://localhost:3000/api/user");
  return res.json();
};
export const MyAccount = () => {
  const { data, status } = useQuery("getUser", fetchData);
  const emailUser = localStorage.getItem("currentUsers");
  const dataUsers = data?.filter((item: any) => item.email === emailUser);

  
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
          <Grid container justifyContent="center">
            <Avatar style={avatarStyle}>
              <AccountCircleIcon />
            </Avatar>
          </Grid>
          <Grid container justifyContent="center">
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
