const express = require('express');
const app = express();

app.use(express.json());

app.post('/ping', (req, res) => {
  console.log('Mini /ping hit!');
  res.send('pong');
});

app.listen(5002, () => {
  console.log('Mini server running on http://localhost:5002');
});
