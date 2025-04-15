const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bike = require('./models/Bike');

dotenv.config();

const bikes = [
  {
    name: 'Trek Marlin 5',
    type: 'mountain',
    price: 600,
    brand: 'Trek',
    image: 'https://example.com/trek-marlin5.jpg',
    stock: 10,
  },
  {
    name: 'Specialized Roubaix',
    type: 'road',
    price: 2500,
    brand: 'Specialized',
    image: 'https://example.com/specialized-roubaix.jpg',
    stock: 5,
  },
  {
    name: 'Giant Escape 3',
    type: 'city',
    price: 500,
    brand: 'Giant',
    image: 'https://example.com/giant-escape3.jpg',
    stock: 15,
  },
  {
    name: 'Cannondale Trail 6',
    type: 'mountain',
    price: 800,
    brand: 'Cannondale',
    image: 'https://example.com/cannondale-trail6.jpg',
    stock: 8,
  },
  {
    name: 'Scott Speedster 20',
    type: 'road',
    price: 1200,
    brand: 'Scott',
    image: 'https://example.com/scott-speedster20.jpg',
    stock: 6,
  },
  {
    name: 'Electra Townie',
    type: 'city',
    price: 550,
    brand: 'Electra',
    image: 'https://example.com/electra-townie.jpg',
    stock: 12,
  },
  {
    name: 'Yeti SB130',
    type: 'mountain',
    price: 5200,
    brand: 'Yeti',
    image: 'https://example.com/yeti-sb130.jpg',
    stock: 3,
  },
  {
    name: 'Pinarello Dogma F',
    type: 'road',
    price: 12000,
    brand: 'Pinarello',
    image: 'https://example.com/pinarello-dogma.jpg',
    stock: 2,
  },
  {
    name: 'Gazelle Chamonix',
    type: 'city',
    price: 900,
    brand: 'Gazelle',
    image: 'https://example.com/gazelle-chamonix.jpg',
    stock: 7,
  },
  {
    name: 'Santa Cruz Nomad',
    type: 'mountain',
    price: 4500,
    brand: 'Santa Cruz',
    image: 'https://example.com/santa-cruz-nomad.jpg',
    stock: 4,
  },
];

const seedBikes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Bike.deleteMany({}); // Clear existing bikes
    await Bike.insertMany(bikes);
    console.log('10 bikes seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding bikes:', error);
    mongoose.connection.close();
  }
};

seedBikes();