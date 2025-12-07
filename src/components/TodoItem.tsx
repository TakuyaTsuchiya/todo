'use client';

import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="group flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-gray-800 break-words ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
      >
        削除
      </button>
    </li>
  );
}
