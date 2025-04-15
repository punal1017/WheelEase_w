import { useState, useEffect } from 'react';
import { Container, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import axios from 'axios';
import BikeCard from '../components/BikeCard';

function Home() {
  const [bikes, setBikes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/bikes`);
        setBikes(response.data);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };
    fetchBikes();
  }, []);

  const addToCart = (bike) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item._id === bike._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...bike, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${bike.name} added to cart!`);
  };

  const filteredBikes = filter ? bikes.filter((bike) => bike.type === filter) : bikes;

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        Browse Bikes
      </Typography>
      <FormControl style={{ margin: '20px 0', minWidth: 120 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="mountain">Mountain</MenuItem>
          <MenuItem value="road">Road</MenuItem>
          <MenuItem value="city">City</MenuItem>
        </Select>
      </FormControl>
      {filteredBikes.length === 0 ? (
        <Typography>No bikes available</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBikes.map((bike) => (
            <Grid item xs={12} sm={6} md={4} key={bike._id}>
              <BikeCard bike={bike} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Home;