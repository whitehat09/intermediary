import { Outlet } from "react-router-dom";

import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Grid } from "@material-ui/core";
export const Dashboard = () => {
  const pageAdminStyle = { margin: "-8px", padding: "0px" };
  const mainPageStyle = {
    minHeight: "calc(100vh - 300px)",
  };
  return (
    <>
      <Grid style={pageAdminStyle}>
        <Header />
        <Grid style={mainPageStyle}>
          <Outlet />
        </Grid>
        <Footer />
      </Grid>
    </>
  );
};
