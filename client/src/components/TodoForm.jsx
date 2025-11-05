import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title });
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter new todo..."
      />
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
};

export default TodoForm;
