
const routes  = require('express').Router();
const authMiddleware = require("./middlewares/auth");

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

routes.post('/register', UserController.store);
routes.post('/login', SessionController.index);

routes.get("/user/:user_id", authMiddleware, UserController.index);

module.exports = routes;
