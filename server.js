import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Proxy endpoint
app.get('/api/manga', async (req, res) => {
    try {
      const url = new URL('https://api.mangadex.org/manga');
      const params = { limit: 10, 'order[rating]': 'desc' };
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
