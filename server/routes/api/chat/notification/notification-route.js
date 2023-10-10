const express = require('express');

const Router = express.Router();

const controller = require('../../../../controllers/api/chat/notification/notification-controller');

const checkAuthenticated = require('../../../../middlewares/checkAuthenticated');
const checkAdminRole = require('../../../../middlewares/checkAdminRole');

const { createOne, updateOne, deleteOne, findByQueryParams, pagination } = controller;

Router.route('/')
    .post(checkAdminRole, createOne)
    .patch(checkAdminRole, updateOne)
    .get(checkAuthenticated, findByQueryParams)
    .delete(checkAdminRole, deleteOne)

module.exports = Router;