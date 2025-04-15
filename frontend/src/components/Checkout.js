import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function Checkout() {
  const [form, setForm] = useState({ name: '', address: '' });
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const bikes = cart.map((item) => ({ bikeId: item._id, quantity: item.quantity }));
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        { bikes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
      window.location.href = '/';
    } catch (error) {
      alert('Error placing order');
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: 20 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Place Order
        </Button>
      </form>
    </Container>
  );
}

export default Checkout;