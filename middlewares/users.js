const users = require('../models/user');
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
    console.log("GET /users");
    req.usersArray = await users.find({});
    next();
};

const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
        req.user = await users.findById(req.params.id);
        next();
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    }
};

const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
        console.log(req.body);
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.status(400).send("Error creating user");
    }
};

const updateUser = async (req, res, next) => {
    try {
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: "Error updating user" });
    }
};

const deleteUser = async (req, res, next) => {
    console.log("DELETE /users/:id");
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: "Error deleting user" });
    }
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
        return req.body.email === user.email;
    });
    if (isInArray) {
        res.status(400).send({ message: "Пользователь с таким email уже существует" });
    } else {
        next();
    }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
        res.status(400).send({ message: "Введите имя и email" });
    } else {
        next();
    }
};

const filterPassword = (req, res, next) => {
    const filterUser = (user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    };
    if (req.user) {
        req.user = filterUser(req.user);
    }
    if (req.usersArray) {
        req.usersArray = req.usersArray.map((user) => filterUser(user));
    }
    next();
};

const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
};

module.exports = {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmail,
    filterPassword,
    hashPassword,
};