import * as React from "react";
import {
  Avatar,
  Button,
  Grid,
  CssBaseline,
  TextField,
  Link,
  Box,
  Modal,
  Divider,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as actionType from "../store/actions";
import { connect } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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

function UserSignUp(props) {
  const { actions, successMsg, errorMsg, signUpLoading } = props;
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      number: data.get("phoneNumber"),
      password: data.get("password"),
      role: "user",
    };
    if (
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.number ||
      !userData.password
    ) {
      console.log("Please Enter all required Fields.");
      setError("Please enter all required fields.");
    } else {
      setError(null);
      actions.createUser({ data: userData });
    }
  };

  useEffect(() => {
    console.log("User data loading", signUpLoading);
  });

  useEffect(() => {
    // console.log("Successmsg is", successMsg);
    // console.log("errorMsg is", errorMsg);
    if (successMsg || errorMsg || error) {
      setOpenModal(true);
    }
  }, [successMsg, errorMsg, error]);

  const handleClose = () => {
    setOpenModal(false);
    if (successMsg) {
      navigate("/login");
    }
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
              "url(https://img.freepik.com/free-photo/top-view-education-day-concept-with-copy-space_23-2148779725.jpg?size=626&ext=jpg&ga=GA1.2.2000971037.1685621599&semt=ais)",
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
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "140px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#99635c" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              User SignUp
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fisrtName"
                    label="First Name"
                    name="firstName"
                    inputProps={{ pattern: "[A-Za-z ]+" }}
                    autoComplete="firstName"
                    sx={{
                      textAlign: "center",
                      border: "2px black",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    sx={{
                      textAlign: "center",
                      border: "2px black",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    sx={{
                      textAlign: "center",
                      border: "2px black",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    sx={{
                      textAlign: "center",
                      border: "2px black",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    sx={{
                      textAlign: "center",
                      border: "2px black",
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  borderRadius: 15,
                  backgroundColor: "#99635c",
                  padding: "14px 20px",
                  fontSize: "14px",
                }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {signUpLoading ? (
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
            {successMsg ? (
              <Typography p={2} sx={{ color: "green" }}>
                {successMsg}
              </Typography>
            ) : (
              <Typography p={2} sx={{ color: "red" }}>
                {error ? error : errorMsg}
              </Typography>
            )}
          </Box>
        </Modal>
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = ({ userReducer }) => {
  return {
    successMsg: userReducer.successMsg,
    errorMsg: userReducer.errorMsg,
    signUpLoading: userReducer.signUpLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    createUser: (payload) => {
      dispatch(actionType.createUser(payload));
    },
    resetData: () => {
      dispatch(actionType.resetData());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp);
