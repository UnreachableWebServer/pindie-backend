const usersRouter = require('express').Router();

const { findAllUsers, createUser, findUserById, updateUser, deleteUser, checkIsUserExists, checkEmptyNameAndEmail, filterPassword, hashPassword } = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe } = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');

usersRouter.get(
  "/me",
  checkAuth,
  sendMe
);

usersRouter.get(
  "/users",
  findAllUsers,
  filterPassword,
  sendAllUsers
);

usersRouter.get(
  "/users/:id",
  findUserById,
  filterPassword,
  sendUserById,
);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.delete(
  "/users/:id",
  checkAuth,
  deleteUser,
  sendUserDeleted
);

module.exports = usersRouter;