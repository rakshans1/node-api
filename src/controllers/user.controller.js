/**
 * User controller
 */

import Joi from "joi";
import HTTPStatus from "http-status";

import { filteredBody } from "../utils/filteredBody";
import User from "../models/user.model";

const users = {
  create: ['name', 'email', 'username', 'password'],
}

export const validation = {
  create: {
    body: {
      name: Joi.string()
        .max(20)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        // .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      username: Joi.string()
        .min(3)
        .max(20)
        .required()
    }
  }
};


/**
 * @api {post} /users/signup Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} name User name.
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 * @apiParam (Body) {String} username User username.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} id User id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
export async function create(req, res, next) {
  const body = filteredBody(req.body, users.create);
  try {
    const user = await User.create(body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}


export async function list(req, res, next) {
  try {
    const users = await User.find({});
    return res.status(HTTPStatus.OK).json(users);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
