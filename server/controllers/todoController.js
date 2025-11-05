const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title, userId: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
