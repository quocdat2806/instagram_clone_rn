const requestHeaders = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  maxAge: 3600,
  preflightContinue: false,
  exposedHeaders: "Content-Disposition",
};

module.exports = requestHeaders;
