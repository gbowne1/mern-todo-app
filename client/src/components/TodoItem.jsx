import React from 'react';

const TodoItem = ({ todo, onRemove }) => {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <span>{todo.title}</span>
      </div>
      <button className="btn btn-secondary" onClick={() => onRemove(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
