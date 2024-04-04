// src/index.ts
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});