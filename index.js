//imports
require('dotenv').config()
const { error } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const Customer = require('./models/customer')


//Connection to database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log("Connected to Database"))

//app
const app = express()
app.use(bodyParser.json()); //middleware


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



app.listen(3000, ()=> console.log(('server started')))