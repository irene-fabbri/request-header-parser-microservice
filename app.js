const express = require(`express`);
const cors = require('cors')
const app = express ();
// to get the client real ip address
app.set('trust proxy', true);

app.use(cors());

app.use((req, res, next) => {
  if (['GET'].includes(req.method)) {
  } else {
    return res.status(405).send({
      "errors": [
          {
              "status": "405",
              "code": "method-not-allowed",     
              "title": "Method not allowed",
              "detail": "Request metod MUST be GET"
          }
      ]
  });
}
  next();
});

// set response Content-Type to be 'application/vnd.api+json'
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/vnd.api+json');
  next();
});

app.get('/api/whoami',  (req,res) => {

  const ip = req.ip || "IP not found";
  const language = req.get('accept-language') ? req.get('accept-language').split(',')[0] : 'Preferred language not found';  // Extract first preferred language
  const software = req.get('user-agent') || 'User-Agent not found';  // Extract User-Agent or default message

  res.status(200).json({
    "data": {
        "type": "client-info",
        "attributes": {
            "ip": `${ip}`,
            "language": `${language}`,
            "software": `${software}`
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