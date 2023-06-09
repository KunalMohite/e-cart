import React, {useState} from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Divider,
  Button,
  TextField,
  Modal
} from "@mui/material";
import Navbar from "./Navbar";
function Cart() {
  function createData(name, quantity, prize) {
    return { name, quantity, prize };
  }
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Vans', quantity: 2, price: 30 },
    { id: 2, name: 'Winter body', quantity: 3, price: 10 },
    { id: 3, name: 'Cropped-sho', quantity: 1, price: 70 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });
  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setAddress('');
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
  
  return (
    <Box
      sx={{
        marginTop: 0,
        backgroundImage: "url(shoppingCartbg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
      }}
    >
      <Grid item style={{ marginBottom: "80px" }} xs={12}>
        <Navbar />
      </Grid>
      <Stack>
        <Box
          sx={{
            padding: 2,
            marginLeft: 5,
            marginTop: 8,
            bgcolor: "white",
            minHeight: 400,
            width: 600,
            marginBottom: 10,
            border: "1px solid green",
          }}
        >
          <Typography sx={{ color: "red" }} align="center" variant="h4" py={2}>
            Cart
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">${row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ height: "1px", backgroundColor: "blue" }} />
          <Stack
            direction="column"
            pt={2}
            spacing={1}
            justifyContent="flex-end"
            alignItems="end"
          >
<Stack direction="row" spacing={2}>
            <Typography variant="h6" style={{ marginTop: '16px' }}>
        Total Amount: $ {getTotalAmount()}
      </Typography>
            </Stack>

            <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: '16px' }}>
        Place Order
      </Button>
          </Stack>
        </Box>
      </Stack>
      <Modal open={showModal} onClose={handleModalClose}>
        <div 
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "auto",
          padding: "1rem",
          outline: "none",
          marginTop: "10vh",
          maxHeight: "80vh",
          overflow: "auto",
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
        }}>
          <Typography variant="h6" style={{ marginBottom: '16px' }}>Enter Shipping Address</Typography>
    <TextField label="Street 1" name="street1" value={address.street1} onChange={handleAddressChange} fullWidth style={{ marginBottom: '16px' }} />
    <TextField label="Street 2" name="street2" value={address.street2} onChange={handleAddressChange} fullWidth style={{ marginBottom: '16px' }} />

    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <TextField label="City" name="city" value={address.city} onChange={handleAddressChange} style={{ marginRight: '8px' }} />
      <TextField label="State" name="state" value={address.state} onChange={handleAddressChange} style={{ marginRight: '8px' }} />
      <TextField label="Country" name="country" value={address.country} onChange={handleAddressChange} />
    </div>

    <TextField label="Zip Code" name="zipCode" value={address.zipCode} onChange={handleAddressChange} fullWidth style={{ marginBottom: '16px' }} />
    <Button variant="contained" color="primary" onClick={handleModalClose}>Place Order</Button>
          </div>
      </Modal>
    </Box>
  );
}

export default Cart;
