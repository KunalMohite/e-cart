import React from 'react';
import { Link } from "react-router-dom";
import "../App";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#ffffff",
    boxShadow:
      "0px 1px 2px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.0), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    height: 75,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    float: "right",
    marginTop: "10px",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "#eee",
    padding: theme.spacing(2),
    boxShadow:
      "0px 1px 2px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.0), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    height: 30,
  },
  title: {
    color: "#004499",
    fontFamily: "Kaushan Script",
    mt: "3px",
    fontSize: "40px",
  },
  description: {
    color: "#022796",
    fontFamily: "Crimson Text",
    // mt: "3px",
    fontSize: "16px",
  },
  heading: {
    color: "#d40080",
    fontFamily: "Lobster",
    mt: "3px",
    fontSize: "20px",
  },
}));
 const Navbar = ()=>{
    const classes = useStyles();
    return(
        <AppBar component="nav" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            E
          </Typography>
          <Typography variant="h4" className={classes.title}>
            -cart
          </Typography>
          <Box
            sx={{
              // display: { xs: "none", sm: "block" },
              position: "absolute",
              top: 0,
              right: 0,
              mt: "18px",
              mr: "10px",
            }}
          >
            
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 2 }}
              style={{
                borderRadius: 15,
                backgroundColor: "#c62624",
                padding: "8px 16px",
                fontSize: "14px",
                color: "#ffffff",
                marginLeft: "5px",
                marginRight: "5px",
              }}
              component={Link}
              to="/cart"
            >My Cart <ShoppingCartOutlinedIcon sx={{ paddingLeft:"10px"}}/>
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 2 }}
              style={{
                borderRadius: 15,
                backgroundColor: "#c62624",
                padding: "8px 16px",
                fontSize: "14px",
                color: "#ffffff",
                marginLeft: "5px",
                marginRight: "5px",
              }}
              component={Link}
              to="/"
            >Logout <ExitToAppOutlinedIcon sx={{ paddingLeft:"10px"}}/>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;