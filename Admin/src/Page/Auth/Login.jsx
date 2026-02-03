import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../Redux/slice/Login.slice.js";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1556155092-490a1ba16284",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786",
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [index, setIndex] = useState(0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(form));
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  // Slider auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-white">
      {/* LEFT - LOGIN FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-orange-100">
          <h2 className="text-4xl font-bold text-orange-500 mb-1">
            Admin Login
          </h2>
          <p className="text-gray-500 mb-8">
            Manage your system with confidence
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90 transition-all shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </div>

      {/* RIGHT - IMAGE SLIDER */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {/* Image */}
        <img
          src={images[index]}
          alt="Admin Dashboard"
          className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out duration-3000"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-orange-900/60"></div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-10">
          <h1 className="text-4xl font-bold mb-4">Admin Control Panel</h1>
          <p className="text-lg text-orange-100 text-justify  max-w-md">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            totam quia officia laboriosam eum atque! Corporis magnam fuga
            repellat voluptatem, officiis iure, odit vel magni maxime nam
           
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
