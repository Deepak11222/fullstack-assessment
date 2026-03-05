import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="navbar">

      <h2>HRMS Lite</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </div>

    </nav>
  );

};

export default Navbar;