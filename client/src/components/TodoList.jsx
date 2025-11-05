import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onRemove }) => {
  if (!todos.length) {
    return <p>No todos yet!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onRemove={onRemove} />
      ))}
    </ul>
  );
};

export default TodoList;
