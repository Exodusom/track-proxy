// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY; // We'll set this securely in Render

app.use(cors());
app.use(bodyParser.json());

app.post('/track', async (req, res) => {
  try {
    const response = await fetch('https://api.17track.net/track/v2/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        '17token': API_KEY
      },
      body: JSON.stringify({ data: req.body.data })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
