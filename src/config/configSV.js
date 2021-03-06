require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3100,
  cors: process.env.CORS
};

module.exports = { config };