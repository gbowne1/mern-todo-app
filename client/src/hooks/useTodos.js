import { useState, useEffect } from 'react';
import todoService from '../services/todoService';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    todoService.getAll()
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const addTodo = async (todo) => {
    const created = await todoService.create(todo);
    setTodos(prev => [...prev, created]);
  };

  const removeTodo = async (id) => {
    await todoService.remove(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return { todos, loading, error, addTodo, removeTodo };
}
