export const errorHandler = (err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Setting headers if specified
  if (err.headers) {
    Object.keys(err.headers).forEach((header) => {
      res.setHeader(header, err.headers[header]);
    });
  }

  // Not distinguishin between dev and prod enviroments for errors

  res.status(code).json({ message });
};
