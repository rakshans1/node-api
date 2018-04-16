/* eslint-disable no-console */
import chalk from 'chalk';

import mongoose from "mongoose";

import constants from "./constants";


// Remove the warning with Promise
mongoose.Promise = global.Promise;



// If debug run the mongoose debug options
mongoose.set("debug", process.env.MONGOOSE_DEBUG);

try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once("open", () => console.log(chalk.green("MongoDB Running")))
  .on("error", e => {
    // throw e;
    console.log(e);
  });
