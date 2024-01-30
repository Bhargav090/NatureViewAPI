const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(cors());

// Serve images directly through the /images endpoint
app.use('/images', express.static(__dirname));

// Endpoint to retrieve nature images with full URLs
app.get('/', (req, res) => {
  try {
    const imagePaths = [
      { id: 1, description: 'Beautiful landscape', filename: 'img1.jpg' },
      { id: 2, description: 'High landscape', filename: 'img2.jpg' },
      { id: 3, description: 'Low landscape', filename: 'flower1.jpg' },
      // Add more images as needed
    ];

    const images = imagePaths.map(image => ({
      id: image.id,
      url: `/images/${image.filename}`,
      description: image.description,
    }));

    res.json(images);
  } catch (error) {
    console.error('Error in / endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, host, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
