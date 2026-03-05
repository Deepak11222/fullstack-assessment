import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {

  return (
    <div className="navbar">

      <div className="navbar-inner">

        <div className="logo">
          HRMS Lite
        </div>

        <div className="nav-links">

          <Link to="/">Employees</Link>

          <Link to="/attendance">Attendance</Link>

        </div>

      </div>

    </div>
  );

};

export default Navbar;