//imports
require('dotenv').config()
const { error } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const Customer = require('./models/customer')
const Mart = require('./models/marts')
const Restaurant = require('./models/restaurants')


//Connection to database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log("Connected to Database"))

//app
const app = express()
app.use(bodyParser.json()); //middleware


//main menue route
app.get("/shopSetup", function(req, res){
  const filePath = path.join(__dirname, 'public', 'HTML', 'shopSetup.html');
  res.sendFile(filePath);
})

//main menue route
app.get("/mainMenue", function(req, res){
  const filePath = path.join(__dirname, 'public', 'HTML', 'main.html');
  res.sendFile(filePath);
})

//Authorization page route
app.use(express.static(__dirname+"/public"));
app.get("/authorization", function(req, res){
  const filePath = path.join(__dirname, 'public', 'HTML', 'authorization.html');
  res.sendFile(filePath);
})

// Define POST route to add a new customer
app.post('/api/customers', async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const customer = new Customer({ userName, email, password });
      await customer.save();
      res.status(201).json({ message: 'Customer created successfully', customer });
      console.log("customer saved")
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Define GET route to get all usernames and passwords
app.get('/api/customers', async (req, res) => {
  try {
    // Query the database to retrieve all customers
    const customers = await Customer.find({}, 'userName password');

    // Extract usernames and passwords
    const userData = customers.map(customer => ({
      userName: customer.userName,
      password: customer.password
    }));

    // Send the usernames and passwords as JSON response
    res.status(200).json(userData);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});



// Define POST route to add a new mart
app.post('/api/marts', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const mart = new Mart({ userName, email, password });
    await mart.save();
    res.status(201).json({ message: 'mart created successfully', mart });
    console.log("mart saved")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define GET route to get all usernames and passwords
app.get('/api/marts', async (req, res) => {
try {
  // Query the database to retrieve all marts
  const marts = await Mart.find({}, 'userName password');

  // Extract usernames and passwords
  const userData = marts.map(mart => ({
    userName: mart.userName,
    password: mart.password
  }));

  // Send the usernames and passwords as JSON response
  res.status(200).json(userData);
} catch (error) {
  // Handle errors
  res.status(500).json({ error: error.message });
}
});



// Define POST route to add a new restaurant
app.post('/api/restaurants', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const restaurant= new Restaurant({ userName, email, password });
    await restaurant.save();
    res.status(201).json({ message: 'restaurant created successfully', restaurant });
    console.log("restaurant saved")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define GET route to get all usernames and passwords
app.get('/api/restaurants', async (req, res) => {
try {
  // Query the database to retrieve all marts
  const restaurants = await Restaurant.find({}, 'userName password');

  // Extract usernames and passwords
  const userData = restaurants.map(mart => ({
    userName: restaurant.userName,
    password: restaurant.password
  }));

  // Send the usernames and passwords as JSON response
  res.status(200).json(userData);
} catch (error) {
  // Handle errors
  res.status(500).json({ error: error.message });
}
});




app.listen(3000, ()=> console.log(('server started')))