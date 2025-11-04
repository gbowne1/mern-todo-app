import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo } from '../features/todos/todosSlice';
import { logout } from '../features/auth/authSlice';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addTodo({ text: newTodo, completed: false }));
    setNewTodo('');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
      <TextField value={newTodo} onChange={(e) => setNewTodo(e.target.value)} label="New Todo" fullWidth />
      <Button onClick={handleAdd} variant="contained">Add</Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo._id}>
            <ListItemText primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
            <IconButton><CheckCircleIcon /></IconButton>
            <IconButton><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
