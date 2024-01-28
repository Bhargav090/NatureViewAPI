const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(bodyParser.json());
app.use(cors());

// Mock data for nature images
const natureImages = [
  { id: 1, filename: 'img1.jpg', description: 'Beautiful landscape' },
  { id: 2, filename: 'img2.jpg', description: 'High landscape' },
  // Add more images as needed
];

// Serve images through an endpoint
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint to retrieve all nature images
app.get('/images', (req, res) => {
  res.json(natureImages);
});

// Endpoint to add a new nature image
app.post('/images', (req, res) => {
  const newImage = req.body;
  // Assuming new images are added with a filename property
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
