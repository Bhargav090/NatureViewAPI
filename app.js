const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(bodyParser.json());
app.use(cors());

// Mock data for nature images
const natureImages = [
  { id: 1, filename: 'img1.jpg', description: 'Beautiful landscape' },
  { id: 2, filename: 'img2.jpg', description: 'High landscape' },
  { id: 3, filename: 'flower1.jpg', description: 'Low landscape' },
  // Add more images as needed
];

// Serve images through an endpoint
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint to retrieve nature images with full URLs
app.get('/', (req, res) => {
  try {
    const imagePaths = natureImages.map(image => ({
      id: image.id,
      url: `/images/${image.filename}`,
    }));
    res.json(imagePaths);
  } catch (error) {
    console.error('Error in / endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to add a new nature image
app.post('/images', (req, res) => {
  const newImage = req.body;
  newImage.id = natureImages.length + 1; // Assign a unique ID
  newImage.url = `/images/${newImage.filename}`;
  natureImages.push(newImage);
  res.json({ message: 'Image added successfully', image: newImage });
});

// Endpoint to update an existing nature image
app.put('/images/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedImage = req.body;

  natureImages.forEach(image => {
    if (image.id === id) {
      Object.assign(image, updatedImage);
    }
  });

  res.json({ message: 'Image updated successfully', image: updatedImage });
});

app.listen(PORT, host, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
