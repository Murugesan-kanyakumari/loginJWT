const express = require('express');
const routes = require('./api');
const app = express();

app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "server error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(3000,() => console.log('running port 3000'));