require("dotenv").config();

const npsUtils = require("nps-utils");

const { rimraf, crossEnv, series } = npsUtils;

module.exports = {
  scripts: {
    build: {
      description: "Building in production environment.",
      default: series.nps("clean", "build.build", "copy"),
      build: "babel src -d dist --ignore src/public"
    },
    clean: {
      description: "Clean dist folder.",
      default: rimraf("dist")
    },
    copy: {
      description: "Copying Views",
      default: "cp -r ./src/views/ ./src/public/ ./dist/"
    },
    default: {
      description: "Start project with pm2 on production.",
      script: `${crossEnv(
        "NODE_ENV=production"
      )} pm2 start processes.json dist/index.bundle.js`
    },
    doc: {
      description: 'Documenting the api.',
      default: 'apidoc -i src',
      deploy: {
        description: 'Deploy the docs on surge.',
        script: series('nps doc', `surge ./doc -d ${process.env.DOCS_WEBSITE}`),
      },
    },
    dev: {
      start: {
        description: "Running on dev environment.",
        script: `${crossEnv(
          "NODE_ENV=development"
        )} nodemon --exec babel-node ./src/bin/www.js`
      },
      default: "dev.start",
      debug: {
        script: `${crossEnv(
          "NODE_ENV=development"
        )} MONGOOSE_DEBUG=true DEBUG=express:* nodemon --exec babel-node ./src/bin/www`
      },
      inspect: {
        script: `${crossEnv(
          "NODE_ENV=development"
        )} nodemon --inspect --exec babel-node ./src/bin/www`
      }

    },
    lint: {
      default: "eslint src",
      fix: "eslint --fix src"
    },
    lintStaged: "lint-staged"
  }
};
