module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack to the console
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
};
