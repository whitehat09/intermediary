import { Outlet } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { Header } from "../../components/public-layout/Header/Header";
import { Footer } from "../../components/public-layout/Footer/Footer";
export const Home = () => {
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
