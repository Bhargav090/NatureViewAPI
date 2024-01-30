const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const imagesFolder = path.join(__dirname, 'images');
const imagesJsonPath = path.join(__dirname, 'imagespath.json'); // Updated file name

// Serve static files from the "images" directory
app.use('/images', express.static(imagesFolder));

// Your existing route for fetching image names
app.get('/images', (req, res) => {
    // Read image paths from the JSON file
    fs.readFile(imagesJsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading images JSON file.' });
        }

        try {
            const imageFiles = JSON.parse(data);

            res.json({ images: imageFiles });
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing images JSON data.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
