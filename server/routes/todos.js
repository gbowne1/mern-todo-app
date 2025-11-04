const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.post('/', async (req, res) => {
  const todo = new Todo({ ...req.body, userId: req.userId });
  await todo.save();
  res.json(todo);
});

// Add delete/update routes similarly

module.exports = router;
