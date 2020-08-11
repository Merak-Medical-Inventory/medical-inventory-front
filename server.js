//Install express server
const express = require('express');

const app = express();
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/merak-medical-inventory'));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
