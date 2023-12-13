const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 4000;

app.use(express.json());

const filePath = 'sample.txt';

// Welcome Endpoint (GET /)
app.get('/', (req, res) => {
  res.send('Welcome to the Express File Operations API!');
});

// ReadFile Endpoint (GET /readFile)
app.get('/readFile', async (req, res) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    res.status(200).send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error reading the file' });
  }
});

// WriteFile Endpoint (POST /writeFile)
app.post('/writeFile', async (req, res) => {
  try {
    const { data } = req.body;
    console.log('Received data for writeFile:', data);

    if (!data) {
      return res.status(400).send({ error: 'No data provided in the request body' });
    }

    await fs.writeFile(filePath, data, 'utf-8');
    res.status(200).send({ message: 'File written successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error writing to the file' });
  }
});

// UpdateFile Endpoint (PUT /updateFile)
app.put('/updateFile', async (req, res) => {
  try {
    const { newData } = req.body;
    console.log('Received new data for updateFile:', newData);

    if (!newData) {
      return res.status(400).send({ error: 'No new data provided in the request body' });
    }

    await fs.appendFile(filePath, '\n${newData}', 'utf-8');
    res.status(200).send({ message: 'File updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error updating the file' });
  }
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});
// Start the server
app.listen(PORT, () => {
  console.log ('Server is running on http://localhost:${PORT}');
});