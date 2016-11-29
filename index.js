const path = require('path');
const fs = require('fs');
const escape = require('escape-html');
const express = require('express');
const app = express();

// Hacky approach to read in script files for convenience as a prototype
let getJs = fs.readFileSync(path.join(__dirname, 'js/get.js'));
let wxJs = fs.readFileSync(path.join(__dirname, 'js/wx.js'));
let embedJs = fs.readFileSync(path.join(__dirname, 'js/embed.js'));

app.use('/js', express.static('js'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/sample', (req, res) => {
  res.sendFile(path.join(__dirname, 'sample.html'));
});

app.get('/embed.js', (req, res) => {
  let title = req.query.title || 'Missing title';
  let units = req.query.units || 'metric';
  let wind = req.query.wind === 'true';
  let selector = req.query.selector || 'wx-embed';

  if (['metric', 'imperial'].indexOf(units) < 0) {
    units = 'metric';
  }

  if (/[^a-zA-Z0-9\-\_]+/.test(selector)) {
    res
      .status(400)
      .send('Bad characters in selector');
    return;
  }

  let payload = [getJs, wxJs, embedJs].join('\n');
  let template = `(function () {
  ${payload}

  embedWeatherWidget('${escape(title)}', '${escape(units)}', ${wind ? 'true' : 'false'}, '${escape(selector)}');
})();
`

  res.status(200).send(template);
})

app.listen(4000, (err) => {
  if (err) {
    console.log(`Error starting app: ${err}`);
    process.exit(1);
  }

  console.log('App running on 4000');
});
