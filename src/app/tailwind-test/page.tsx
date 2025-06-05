export default function TailwindTest() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Tailwind Test</h1>
          <p className="text-lg text-gray-700 mb-6">If you see colors, spacing, and rounded corners, Tailwind is working!</p>
          <button className="px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition">Test Button</button>
          <div className="mt-6 flex gap-4">
            <span className="w-8 h-8 bg-red-400 rounded-full inline-block"></span>
            <span className="w-8 h-8 bg-yellow-400 rounded-full inline-block"></span>
            <span className="w-8 h-8 bg-blue-400 rounded-full inline-block"></span>
          </div>
        </div>
      </div>
    );
  }
  