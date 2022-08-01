const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomRouter = require('./routes/rooms');
const messageRouter = require('./routes/messages');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowlist = JSON.parse(process.env.ALLOWED_ORIGINS);
console.log(allowlist)
if (!Array.isArray(allowlist)) throw new Error('Invalid allowed list')

const corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate))

// app.use('/', indexRouter);
// serve react static asset
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/messages', messageRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
