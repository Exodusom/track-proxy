// ✅ FINAL FIXED VERSION OF YOUR PROXY SERVER
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/track', async (req, res) => {
  try {
    const trackingNum = req.body.number;

    // Log the outgoing payload for debug
    const payload = {
      data: [
        {
          number: trackingNum,
          auto_detect: true
        }
      ]
    };

    console.log('Sending to 17TRACK:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.17track.net/track/v2/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        '17token': API_KEY
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
