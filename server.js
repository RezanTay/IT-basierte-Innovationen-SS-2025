import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(API_URL, {
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    res.status(500).json({ error: "Fehler bei der AI-Antwort" });
  }
});

app.listen(port, () => {
  console.log(`✅ AIPTA Backend läuft auf http://localhost:${port}`);
});
