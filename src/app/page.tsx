import { TodoList } from '@/components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>
        <TodoList />
      </div>
    </div>
  );
}
