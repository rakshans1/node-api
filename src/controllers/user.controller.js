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
 * @apiVersion 1.0.0
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

/**
 * @api {get} /users/list List all users
 * @apiDescription List all users
 * @apiName listUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Array} users Users list.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [
 *  {
 *    "_id":"5ad88c4826eb0300450c2d3e",
 *    "email":"shetty.raxx555@gmail.com",
 *    "name":"Rakshan Shetty",
 *    "createdAt":"2018-04-19T12:32:08.661Z"
 *    "updatedAt":"2018-04-19T12:32:08.661Z"
 *  },
 *  ...
 * ]
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *  {"message":"Not Found!"}
 */
export async function list(req, res, next) {
  try {
    const users = await User.find({}, '_id name email createdAt updatedAt').lean();
    return res.status(HTTPStatus.CREATED).json(users);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
