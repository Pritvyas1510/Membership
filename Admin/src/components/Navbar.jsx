import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/slice/Login.slice.js";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded font-medium ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-700 hover:bg-orange-100"
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* LOGO / TITLE */}
      <h1 className="text-2xl font-bold text-orange-500">
        Monark Foundation <span className="text-black">Admin Panel</span>
      </h1>

      {/* LINKS */}
      <div className="flex items-center gap-4">
        <NavLink to="/home" className={linkClass}>
          All User
        </NavLink>

        <NavLink to="/story" className={linkClass}>
          Story
        </NavLink>

        <NavLink to="eventhome" className={linkClass}>
          Events
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
