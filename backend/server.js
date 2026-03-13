const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Appointment = require('./models/Appointment');
const Service = require('./models/Service');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blended')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// 1. Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error fetching services' });
  }
});

// 2. Create a new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, phone, serviceId, date, time } = req.body;
    
    // Basic validation
    if (!name || !phone || !serviceId || !date || !time) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const appointment = new Appointment({
      name,
      phone,
      serviceId,
      date,
      time,
      status: 'Pending'
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error creating appointment' });
  }
});

// 3. Get all appointments (Admin view)
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('serviceId');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
