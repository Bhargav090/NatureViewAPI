const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(cors());

// Mock data for nature images
const natureImages = [
  { id: 1, filename: 'img1.jpg', description: 'Beautiful landscape' },
  { id: 2, filename: 'img2.jpg', description: 'High landscape' },
  { id: 3, filename: 'flower1.jpg', description: 'Low landscape' },
  // Add more images as needed
];

// Serve images through an endpoint
app.get('/images/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'images', filename);
    const data = await fs.readFile(filePath);

    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(data, 'binary');
  } catch (error) {
    console.error('Error in /images endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to retrieve nature images with full URLs
app.get('/', (req, res) => {
  try {
    const imagePaths = natureImages.map(image => ({
      id: image.id,
      url: `/images/${image.filename}`,
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
