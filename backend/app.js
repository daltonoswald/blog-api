var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts')

var app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.DEV_DB_URL;
// const mongoDB = process.env.DEV_DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


app.use(cors({
  // origin: [
  //   "http://localhost:5173", 
  //   `https://daltonoswald-blog-api-admin.netlify.app`, 
  //   'https://daltonoswald-blog-api-user.netlify.app', 
  //   'https://blog-api-production-6af2.up.railway.app/users/log-in',
  //   'https://blog-api-production-6af2.up.railway.app'],
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 204,
}))

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "scripts-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    }
  })
)

const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

app.use(limiter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
