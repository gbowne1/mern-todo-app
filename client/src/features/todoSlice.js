import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [], // Fallback to localStorage
  isLoading: false,
  error: null
};

// API thunks (use if server is running)
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const res = await axios.get('/api/todos', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo, thunkAPI) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const res = await axios.post('/api/todos', todo, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Add similar for deleteTodo, updateTodo

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Client-only localStorage actions (use if no server)
    addLocalTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
    // Add toggleComplete, removeTodo similarly
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => { state.todos = action.payload; })
      .addCase(addTodo.fulfilled, (state, action) => { state.todos.push(action.payload); });
    // Handle others
  }
});

export const { addLocalTodo } = todosSlice.actions; // For client-only
export default todosSlice.reducer;
