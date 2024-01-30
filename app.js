const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(cors());

// Mock data for nature images
const natureImages = [
  { id: 1, description: 'Beautiful landscape', url: 'https://rich-gray-lovebird-wear.cyclic.app/images/img1.jpg' },
  { id: 2, description: 'High landscape', url: 'https://rich-gray-lovebird-wear.cyclic.app/images/img2.jpg' },
  { id: 3, description: 'Low landscape', url: 'https://rich-gray-lovebird-wear.cyclic.app/images/flower1.jpg' },
  // Add more images as needed
];

// Endpoint to retrieve nature images with full URLs
app.get('/', (req, res) => {
  try {
    res.json(natureImages);
  } catch (error) {
    console.error('Error in / endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, host, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
