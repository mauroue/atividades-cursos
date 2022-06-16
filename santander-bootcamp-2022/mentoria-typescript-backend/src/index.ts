const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/api', (req: any, res: any) => {
  res.json({ success: true, message: 'Hello World' });
});

app.use(cors);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
