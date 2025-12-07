'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoItem } from './TodoItem';
import { FilterType } from '@/types/todo';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了' },
];

export function TodoList() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    totalCount,
    isLoaded,
  } = useTodos();

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  const getEmptyMessage = () => {
    if (filter === 'all') return 'タスクがありません。新しいタスクを追加しましょう！';
    if (filter === 'active') return '未完了のタスクはありません';
    return '完了したタスクはありません';
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          追加
        </button>
      </form>

      {/* Filters */}
      <div className="flex justify-center gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === key
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : 'border-2 border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="bg-white rounded-lg overflow-hidden">
        {todos.length === 0 ? (
          <li className="text-center text-gray-400 py-10">{getEmptyMessage()}</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ul>

      {/* Stats */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500">
        <span>{activeCount} / {totalCount} 件が未完了</span>
        <button
          onClick={clearCompleted}
          className="px-4 py-2 border border-gray-200 rounded-md hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
        >
          完了済みを削除
        </button>
      </div>
    </div>
  );
}
