module.exports = (app) => {
  const paths = require("../controllers/map.controller.js");

  var router = require("express").Router();

  // Create a new path
  router.post("/", paths.create);

  // Retrieve all paths
  router.get("/", paths.findAllPaths);

  app.use("/api/paths", router);
};
