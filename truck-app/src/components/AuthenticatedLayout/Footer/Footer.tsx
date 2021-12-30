import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

export const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 5, sm: 7 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Liên hệ với chúng tôi</Box>
              <Box>
                <Link href="/" color="inherit">
                  Số điện thoại :+84 4444 444
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Địa chỉ : No.1111 Hoàn Kiếm, Hà Nội
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Thông tin về chúng tôi
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Facebook
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Youtube
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Tik Tok
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Đối tác</Box>
              <Box>
                <Link href="/" color="inherit">
                  Đối tác 1
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Đối tác 2
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Đối tác 3
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 8 }} pb={{ xs: 5, sm: 0 }}>
            Copyright © Your Website &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};
