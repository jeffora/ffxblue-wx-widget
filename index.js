const path = require('path');
const express = require('express');
const app = express();

app.use('/js', express.static('js'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4000, (err) => {
  if (err) {
    console.log(`Error starting app: ${err}`);
    process.exit(1);
  }

  console.log('App running on 4000');
});
