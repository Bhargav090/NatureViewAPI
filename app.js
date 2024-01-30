const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/images', (req, res) => {

  const imageFolder = './images';

  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting images');
    }

    files.forEach(file => {
      const filePath = path.join(imageFolder, file);
      const buffer = fs.readFileSync(filePath);
      res.write(buffer);
    });

    res.end();
  });

});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
