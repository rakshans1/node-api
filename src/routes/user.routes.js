/**
 * User Routes
 */

import { Router } from "express";
import validate from "express-validation";

import * as UserController from "../controllers/user.controller";
import * as AuthenticationController from "../controllers/authentication.controller";
import { authLocal, authJwt, isLoggedIn, isAuthenticated } from "../services/auth";

const routes = new Router();

routes.post(
  "/signup",
  validate(UserController.validation.create),
  UserController.create
);
routes.post(
  "/login",
  validate(AuthenticationController.validation.login),
  authLocal,
  AuthenticationController.login
);


routes.get(
  "/users",
  authJwt,
  UserController.list
);

export default routes;
