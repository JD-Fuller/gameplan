import express from "express";
import cors from "cors";
import bp from "body-parser";
import DbContext from "./db/dbconfig";
const server = express();

//Fire up database connection
DbContext.connect();

//Sets the port to Heroku's, and the files to the built project
var port = process.env.PORT || 3000;
server.use(express.static(__dirname + "/../client/dist"));

var whitelist = ["http://localhost:8080"];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions));

//REGISTER MIDDLEWEAR
server.use(bp.json());
server.use(
  bp.urlencoded({
    extended: true
  })
);

//REGISTER YOUR SESSION, OTHERWISE YOU WILL NEVER GET LOGGED IN
import AdminController from "./controllers/AdminController";
import Session from "./middleware/session";
server.use(new Session().express);
server.use("/account", new AdminController().router);

//YOUR ROUTES HERE!!!!!!
import PostController from "./controllers/PostController";
import RosterController from "./controllers/RosterController";
import EventController from "./controllers/EventController";

server.use("/api/posts", new PostController().router);
server.use("/api/events", new EventController().router);
server.use("/api/roster", new RosterController().router);

//NOTE Default error handler, catches all routes with an error attached
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

//Catch all
server.use("*", (req, res, next) => {
  res.status(404).send({
    error: "No matching routes"
  });
});

server.listen(port, () => {
  console.log("server running on port", port);
});
