const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const imagesFolder = path.join(__dirname, 'images'); // Assuming images folder is in the same directory as app.js

app.get('/images', (req, res) => {
    fs.readdir(imagesFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading images folder.' });
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/.test(file));

        res.json({ images: imageFiles });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
