const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/images', express.static(__dirname));

app.get('/', (req, res) => {
  try {
    const imagePaths = [
      '/images/img1.jpg',
      '/images/img2.jpg',
      '/images/flower1.jpg',
    ]; // Add more images as needed

    res.json(imagePaths);
  } catch (error) {
    console.error('Error in / endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
