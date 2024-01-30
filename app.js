const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // Replace with your desired port

// Serve images directly from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint to retrieve image URLs and metadata
app.get('/', async (req, res) => {
  try {
    const imageFiles = fs.readdirSync(path.join(__dirname, 'images'));
    const imagePaths = imageFiles.map(file => ({
      filename: file,
      // Add additional metadata as needed (e.g., size, dimensions, etc.)
      url: `/images/${file}`
    }));
    res.json(imagePaths);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
