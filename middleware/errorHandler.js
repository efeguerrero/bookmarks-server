export const errorHandler = (err, req, res, next) => {
  // console.log('errorHandler', err);

  // Setting headers if specified
  if (err.headers) {
    Object.keys(err.headers).forEach((header) => {
      res.setHeader(header, err.headers[header]);
    });
  }

  if (err.message === 'Unauthenticated') {
    // Due to clerk poor error handling in express middleware
    res.status(401).json({ message: 'User not authenticated.' });
  }

  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Not distinguishin between dev and prod enviroments for errors

  res.status(code).json({ message });
};
