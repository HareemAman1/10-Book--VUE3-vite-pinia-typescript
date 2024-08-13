import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const dataFilePath = path.resolve('data.json');


app.get('/books', (req, res) => {
  if (fs.existsSync(dataFilePath)) {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    res.json(JSON.parse(fileContent));
  } else {
    res.json([]); 
  }
});

// Handle POST request to add a new book
app.post('/books', (req, res) => {
  const formData = req.body;

  if (!formData || !formData.title || !formData.author) {
    return res.status(400).send('Fill all feilds');
  }

  let existingData = [];

  if (fs.existsSync(dataFilePath)) {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    existingData = JSON.parse(fileContent) || [];
  }

  existingData.push(formData);

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
    res.status(200).send('Data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
