require("dotenv").config();

const WHITELIST = {
  users: {
    create: ['name', 'email', 'username', 'password'],
  }
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV
};

const testConfig = {
  JWT_SECRET: 'jwtkjfsklafjak^&I#$$%J%',
  MONGO_URL: process.env.MONGO_URL_TEST
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
