'use strict';
const roures_dir = './routers/';

const express = require('express'),
  fs = require('fs'),
  http = require('http'),
  glob = require("glob"),
  server = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  expressVue = require("express-vue"),
  compress = require("compression"),
  validator = require("express-validator"),
  mysql = require('mysql');

var app = {
  config: require('./config.js'),
  router: express.Router(),
};
app.db = mysql
  .createConnection(app.config.db);

app.db.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to db as id ' + app.db.threadId);
});

const expressVueMiddleware = expressVue.init(app.config.vueOptions);
server.use(expressVueMiddleware);

//Security
server.disable("x-powered-by");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true,
}));

server.use(validator());

server.use(compress());
server.use(express.static(app.config.rootWeb));

server.use("/", app.router);

let controllers = glob.sync(roures_dir + "/*.js");
controllers.forEach(function (controller) {
  module.require(controller)(app);
});

/**
 * Generic 404 handler
 * @param {object} req
 * @param {object} res
 */
function error404handler(req, res) {
  const data = {
    title: "Error 404",
  };
  req.vueOptions = {
    head: {
      title: "Error 404",
    },
  };
  res.statusCode = 404;
  res.renderVue("error.vue", data, req.vueOptions);
}
server.use(error404handler);

/**
 * Generic Error handling route
 * @param {object} error
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
function genericErrorHandler(error, req, res, next) {
  res.statusCode = 500;
  let data = {
    errorCode: error.code,
    error: error.stack,
  };
  if (res.statusCode) {
    res.renderVue("error.vue", data);
  } else {
    next();
  }
}
server.use(genericErrorHandler);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});