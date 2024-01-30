const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(cors());

// Serve images directly from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Mock data for nature images
const natureImages = [
  { id: 1, description: 'Beautiful landscape' },
  { id: 2, description: 'High landscape' },
  { id: 3, description: 'Low landscape' },
  // Add more images as needed
];

// Endpoint to retrieve nature images with full URLs
app.get('/', (req, res) => {
  try {
    const imagePaths = natureImages.map(image => ({
      id: image.id,
      url: `/images/img${image.id}.jpg`, // assuming filenames follow img{id}.jpg pattern
      description: image.description,
    }));
    res.json(imagePaths);
  } catch (error) {
    console.error('Error in / endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, host, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
