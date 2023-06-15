const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080; // or any other port you prefer

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  mongoose.connect('mongodb://localhost:27017/frist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
  
  const User = require('./models/user');
   
  app.post('/signup', async (req, res) => {
    try {
        console.log(req.body.username)
      const { username, email, password } = req.body;
  
      // Create a new user instance
      const newUser = new User({ username, email, password });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  

  app.post('/login', async (req, res) => {
    try {
      console.log(req.body)
      const { email, password } = req.body;
        
      // Find the user in the database
      const user = await User.findOne({ email });
  
      // Check if the user exists and the password is correct
      if (user && user.password === password) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error during login' });
    }
  });
  





