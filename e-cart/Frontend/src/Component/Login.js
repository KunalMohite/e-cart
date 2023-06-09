import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Modal,
  Stack,
  Divider,
  Typography,
  CircularProgress
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as actionType from "../store/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";

const theme = createTheme();

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
};

function Login(props) {
  const { actions, jwtToken, loginError, loginLoading } = props;
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (!userData.email || !userData.password) {
      setError("Please Enter required Fields.");
    } else {
      actions.authenticate({ userData });
    }
  };

  useEffect(() => {
    // console.log("JWT Token is", jwtToken);
    // console.log("Login ERROR is", loginError);
    if (jwtToken) {
      console.log("Login Successful...");
      navigate("/product");
    }
    if (loginError || error) {
      setOpenModal(true);
    }
  }, [loginError, jwtToken, error]);

  const handleClose = () => {
    setOpenModal(false);
    actions.resetData();
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-121137.jpg?w=826&t=st=1686033048~exp=1686033648~hmac=7e99a5d2dc4473756ac61017375c97ac1d10c79ed5f7ebae31d263b3770058e1)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "80%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "140px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#99635C" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                  textAlign: "center",
                  border: "2px black",
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  textAlign: "center",
                  border: "2px black",
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 13 }}
                    style={{
                      borderRadius: 15,
                      backgroundColor: "#99635C",
                      padding: "14px 15px",
                      fontSize: "14px",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                {/* <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{
                      borderRadius: 15,
                      backgroundColor: "#8400be",
                      padding: "14px 15px",
                      fontSize: "14px",
                    }}
                  >
                    Login as Admin
                  </Button>
                </Grid> */}
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {loginLoading ? (
        <Stack sx={{ position: "absolute", top: "50%", left: "50%" }} p={1}>
          <CircularProgress size={70} />
        </Stack>
      ) : (
        <Modal open={openModal} onClose={handleClose}>
          <Box sx={modalStyle} p={2}>
            <Stack direction="row" justifyContent="end">
              <Button>
                <CloseOutlinedIcon
                  sx={{ color: "red" }}
                  onClick={handleClose}
                />
              </Button>
            </Stack>
            <Divider sx={{ backgroundColor: "blue" }} />
            <Typography p={2} sx={{ color: "red" }}>
              {error ? error : loginError}
            </Typography>
          </Box>
        </Modal>
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = ({ userReducer }) => {
  return {
    jwtToken: userReducer.jwtToken,
    loginError: userReducer.loginError,
    loginLoading: userReducer.loginLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    authenticate: (payload) => {
      dispatch(actionType.authenticate(payload));
    },
    resetData: () => {
      dispatch(actionType.resetData());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
