import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="h-screen w-1/3 lg:w-64 bg-gray-800 text-white flex flex-col">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-lg hover:text-gray-600 text-gray-300"
            : "text-lg hover:text-gray-600"
        }
      >
        <h1 className="text-2xl font-bold p-4">Home</h1>
      </NavLink>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive
                  ? "text-lg hover:text-gray-600 text-blue-400"
                  : "text-lg hover:text-gray-600"
              }
            >
              Overview
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/add-user"
              className={({ isActive }) =>
                isActive
                  ? "text-lg hover:text-gray-600 text-blue-400"
                  : "text-lg hover:text-gray-600"
              }
            >
              Add User
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
