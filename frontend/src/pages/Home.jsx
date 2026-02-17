import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-6 text-center">

      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
        Organize Your Work <br />
        <span className="text-blue-600">Like a Pro </span>
      </h1>

      <p className="max-w-xl text-gray-600 mb-8 text-lg">
        TaskFlow helps you create, manage, update and track your daily tasks.
        Stay productive and never miss important work again.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Start Free
        </Link>

        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-600 hover:text-white transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
