const express = require(`express`);
const cors = require('cors')
const app = express ();
// to get the client real ip address
app.set('trust proxy', true);

app.use(cors());

// set response Content-Type to be 'application/vnd.api+json'
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/vnd.api+json');
  next();
});

app.get('/api/whoami',  (req,res) => {

  res.status(200).json({
    "data": {
        "type": "client-info",
        "attributes": {
            "ip": `${req.ip}`,
            "language": `${req.get('accept-language')}`,
            "software": `${req.get('user-agent')}`
        }
    }
  });
});

// Centralized error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      "errors": [
        {
          "status": `${error.status}`,
          "code": `${error.message}`,          
          "title": `${error.message}`
        }
      ]
  });
});

// Export the app instance for testing
module.exports = app;