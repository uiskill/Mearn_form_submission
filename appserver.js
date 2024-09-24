// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5001;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tags', { useNewUrlParser: true, useUnifiedTopology: true });

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

const Tag = mongoose.model('Tag', tagSchema);

// Create User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    qualification: { type: String, required: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: true },
    confirm: { type: Boolean, required: true },
});


const User = mongoose.model('User', userSchema);
// Registration Route


app.post('/register', async (req, res) => {
    const { name, email, position, password, gender, confirm, mobile,qualification,city, nationality } = req.body;

    // Validate the request
    if (!name || !email || !position || !password || !gender || !confirm || !mobile || !city || !nationality|| !qualification) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new user instance
        const newUser = new User({
            name,
            email,
            position,
            password,
            gender,
            nationality,
            mobile,
            city,
            qualification,
            confirm
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});
// Backend route to handle CSV upload
app.post('/register/upload', async (req, res) => {
    try {
      const data = req.body;  // Array of records parsed from the CSV
  
      // Assuming you have a Register model
      await Register.insertMany(data);  // Bulk insert the data into MongoDB
  
      res.status(200).json({ message: 'Data uploaded successfully!' });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: 'Error saving data to the database.' });
    }
  });






// Get Registration Data
app.get('/register', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users); // Send the users data as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching registration data' });
    }
});




// DELETE request route
app.delete('/register/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRecord = await User.findByIdAndDelete(id);
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Record not found' });
      }
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting record' });
    }
  });





// Get tags
app.get('/tags', async (req, res) => {
    const tags = await Tag.find();
    res.json(tags);
});

// Add a tag
app.post('/tags', async (req, res) => {
    const newTag = new Tag({ name: req.body.name });
    try {
        const savedTag = await newTag.save();
        res.status(201).json(savedTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a tag
app.delete('/tags/:id', async (req, res) => {
    try {
        await Tag.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
