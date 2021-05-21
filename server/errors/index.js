class CustomError extends Error {
  constructor(err) {
    super(err);
    if (err && typeof (err) === 'string') {
      this.message = err;
    } else if (err && err.message) {
      this.message = err.message;
    } else {
      this.message = null;
    }
    this.code = err && err.code ? err.code : 0;
    this.name = this.constructor.name;
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}

class ClientError extends CustomError {
  constructor(err) {
    super(err);
    this.message = this.message || 'Bad request';
    this.status = err && err.status ? err.status : 400;
  }
};

class ServerError extends CustomError {
  constructor(err) {
    super(err);
    this.message = this.message || 'Internal server error';
    this.status = err && err.status ? err.status : 500;
  }
};

const errorHandler = (err, req, res, next) => {
  // defined errors return to client
  if (err instanceof (ClientError || ServerError)) {
    return res.status(err.status).json(err);
  }

  // all other errors set as Server error
  err = new ServerError(err);

  return res.status(err.status).json(err);

  // // all other errors
  // // set locals, only providing error in development
  // res.locals.comment = 'Something went wrong :(';
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
};

module.exports = {
  errorHandler,
  ClientError,
  ServerError,
};
