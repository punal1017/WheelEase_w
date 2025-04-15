import { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const removeFromCart = (bikeId) => {
    const updatedCart = cart.filter((item) => item._id !== bikeId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item._id}>
                <ListItemText
                  primary={`${item.name} (${item.quantity})`}
                  secondary={`$${item.price * item.quantity}`}
                />
                <Button color="secondary" onClick={() => removeFromCart(item._id)}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: ${totalPrice}</Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            style={{ marginTop: 20 }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;