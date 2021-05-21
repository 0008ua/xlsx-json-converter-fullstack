const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const { ClientError, errorHandler, ServerError } = require('./server/errors');

app.use(cors(
  {
    allowedHeaders: ['Content-Type'],
    // methods: 'POST',
    origin: ['http://localhost:3000', 'https://xlsx-json-converter.herokuapp.com'],
    optionsSuccessStatus: 200,
  },
));

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * all apis, api/404 will be handled here
 */
app.use('/api/data', require('./server/routes/data'));
app.use('/api', (req, res, next) =>
  next(new ClientError({
    message: 'Wrong api',
    status: '404',
  })),
);

/**
 * all not-apis, 404 will be handled at client
 */
// app.use('/', require('./server/routes/index'));
// app.use('*', function(req, res) {
//   res.redirect('/');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new ServerError());
});

// error handler
app.use(errorHandler);

module.exports = app;
