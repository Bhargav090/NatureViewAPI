const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve list of images
app.get('/images', (req, res) => {

  const imageFolder = './images';

  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting images');
    }

    res.json(files);
  });

});

// Serve individual image
app.get('/images/:image', (req, res) => {
  
  const imageName = req.params.image;
  const imagePath = path.join(__dirname, 'images', imageName);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send('Image not found'); 
    } else {
      res.write(data);
      res.end();
    }
  });

});

// Start server 
const port = 3000;
app.listen(port, () => {
  console.log(`Image server listening on port ${port}`);
});
