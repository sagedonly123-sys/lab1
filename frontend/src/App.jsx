// App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './todo.css';

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const done = filter === 'all' ? undefined : filter === 'done';

    fetchTodos(done)
      .then(data => { setTodos(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [filter]);

  const handleAdd = async (title) => {
    const newTodo = await createTodo(title);
    if (filter !== 'done') {
      setTodos(currentTodos => [newTodo, ...currentTodos]);
    }
  };

  const handleToggle = async (id, done) => {
    const updated = await updateTodo(id, { done: !done });
    setTodos(currentTodos => {
      if (filter !== 'all') {
        return currentTodos.filter(todo => todo._id !== id);
      }

      return currentTodos.map(todo => todo._id === id ? updated : todo);
    });
  };

  const handleRename = async (id, title) => {
    const updated = await updateTodo(id, { title });
    setTodos(currentTodos => currentTodos.map(todo => todo._id === id ? updated : todo));
  };

  const handleRemove = async (id) => {
    await deleteTodo(id);
    setTodos(currentTodos => currentTodos.filter(todo => todo._id !== id));
  };

  const handleFilterChange = (nextFilter) => {
    if (nextFilter !== filter) {
      setLoading(true);
      setFilter(nextFilter);
    }
  };

  return (
    <div className="receipt-page">
      <div className="receipt">
        <header className="receipt-header">
          <span className="stamp">Tasks</span>
          <p className="receipt-date">{today}</p>
        </header>

        <TodoForm onAdd={handleAdd} />
        <div className="todo-filters" aria-label="Filter tasks">
          {['all', 'active', 'done'].map(option => (
            <button
              key={option}
              type="button"
              className={filter === option ? 'active' : ''}
              onClick={() => handleFilterChange(option)}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
