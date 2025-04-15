import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

function BikeCard({ bike, addToCart }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardMedia component="img" height="140" image={bike.image} alt={bike.name} />
        <CardContent>
          <Typography variant="h6">{bike.name}</Typography>
          <Typography color="textSecondary">Type: {bike.type}</Typography>
          <Typography variant="body1">${bike.price}</Typography>
          <Typography color={bike.stock > 0 ? 'green' : 'red'}>
            {bike.stock > 0 ? `${bike.stock} in stock` : 'Out of stock'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={bike.stock === 0}
            onClick={() => addToCart(bike)}
            style={{ marginTop: 10 }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BikeCard;