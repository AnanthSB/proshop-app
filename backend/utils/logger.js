const logger = (req, res, next) => {
  console.log(JSON.stringify(req?.body));
  next();
};

export default logger;
