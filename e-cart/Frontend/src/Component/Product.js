import React, { useState } from 'react';
import { Grid, Card, Typography, Button ,Modal,Backdrop,Fade, CardActionArea } from '@material-ui/core';
import Navbar from "./Navbar"
import Item1 from '../images/item1.jpg'
import Item2 from '../images/item2.jpg'
import Item3 from '../images/item3.jpg'
import Item4 from '../images/item4.jpg'
import Item5 from '../images/item5.jpg'
import Item6 from '../images/item6.jpg'
const products = [
  { id: 1, name: 'Winter body', price: 10,img:Item1, description:'Mens HUNTER 6 inches Hiking/Snow boots for men for outdoor Trekking - non slip, Water Proof, Anti-Fatigue, Comfortable & Light weight ' },
  { id: 2, name: 'Adidas', price: 20, img:Item2, description:'They have a mesh and synthetic upper accented by contrast 3-Stripes. The durable blown out one piece super grip EVA midsole and outsole ensures maximum stability and grip on the ground.' },
  { id: 3, name: 'Vans', price: 30, img:Item3, description :'The Authentic is the original Vans silhouette. First introduced in 1966 and driven forward by creative culture ever since, this time-honored shoe keeps the old school vibe alive with sturdy canvas uppers in seasonal colorways. With its classic low-top design and iconic rubber waffle outsole, the Authentic is a blank canvas for creativity that allows you to do your thing in your own unique way.' },
  { id: 4, name: 'White', price: 40, img:Item4, description: 'The radiance lives on in the Nike Air Force 1 07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.' },
  { id: 5, name: 'Cropped-sho', price: 70, img:Item5 , description:'These Cropped lace-up shoes from Allen Solly Woman will ensure a smart and comfortable finish to your outfit.'},
  { id: 6, name: 'Blues', price: 90, img:Item6, description:'This is not just any shoe, but a Made in India pair made with 100% Recycled Plastic bottles. It is light and comfortable, designed to give you enough room to stretch, and be worn all day long, anytime, anywhere.' },
];

const Product = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item style={{marginBottom:"100px"}} xs={12}><Navbar/></Grid>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card style={{ padding: '1rem' }}>
          <CardActionArea onClick={() => handleOpenModal(product)}>
            <Grid>
              <img src={product.img} alt={product.name} style={{width:'100%', marginBottom:'1rem'}}/>
            </Grid>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="subtitle1">Price: ${product.price}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Modal
        open={!!selectedProduct}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!selectedProduct}>
          <div style={{
            backgroundColor: 'white',
            maxWidth: '600px',
            margin: 'auto',
            padding: '1rem',
            outline: 'none',
            marginTop: '10vh',
            maxHeight:'80vh',
            overflow:'auto'
          }}>
            <Grid>
              <img src={selectedProduct?.img} alt={selectedProduct?.name} style={{width:'100%', alignContent:'center', marginBottom:'1rem'}}/>
            </Grid>
            <Typography variant="h6">{selectedProduct?.name}</Typography>
            <Typography variant="body1">{selectedProduct?.description}</Typography>
            <br/>
            <Typography variant="subtitle1">Price: ${selectedProduct?.price}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(selectedProduct)}
              style={{ marginTop: '1rem' }}
            >
              Add to Cart
            </Button>
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default Product;