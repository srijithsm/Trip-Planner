const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const User = require('./models/User'); // Import User model
const Booking = require('./models/bookings'); // Import Booking model

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ========== Nodemailer Setup ==========
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (recipientEmail, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Thank you for your booking!',
    text: `Dear ${bookingDetails.name},\n\nThank you for booking your trip to ${bookingDetails.destination}.\nWe have received your booking and will contact you shortly.\n\nSafe travels!\n\n— The Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
};

// ========== SIGNUP Route ==========
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
});

// ========== LOGIN Route ==========
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// ========== Booking Route ==========
app.post('/api/bookings', async (req, res) => {
  const bookingData = req.body;

  const newBooking = new Booking({
    name: bookingData.name,
    age: bookingData.age,
    phone: bookingData.phone,
    email: bookingData.email, // Include email
    destination: bookingData.destination,
    restaurant: bookingData.restaurant,
    hotel: bookingData.hotel,
    days: bookingData.days,
    travelMode: bookingData.travelMode,
    persons: bookingData.persons,
    budget: bookingData.budget,
    requirements: bookingData.requirements,
    startDate: bookingData.startDate,
  });

  try {
    const savedBooking = await newBooking.save();

    // Send confirmation email if email is provided
    if (bookingData.email) {
      await sendConfirmationEmail(bookingData.email, bookingData);
    }

    res.status(201).json({
      message: 'Booking created successfully!',
      booking: savedBooking,
    });
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
