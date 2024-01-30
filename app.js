const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const imagesDirectory = path.join(__dirname, 'images');
app.use('/images', express.static(imagesDirectory));

app.get('/', (req, res) => {

  const imagesFolder = './images';

  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      return res.status(500).json({error: 'Failed to read images folder'});
    }

    const imagePaths = files.map(file => {
      return `/images/${file}`; 
    });

    res.json(imagePaths);

  });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
