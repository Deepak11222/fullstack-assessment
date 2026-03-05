import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = () => {

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const API_EMP = "https://fullstack-assessment-agg9.onrender.com/api/employee";
  const API_ATT = "https://fullstack-assessment-agg9.onrender.com/api/attendance";

  useEffect(() => {

    const fetchData = async () => {
      const empRes = await axios.get(API_EMP);
      const attRes = await axios.get(API_ATT);

      setEmployees(empRes.data);
      setAttendance(attRes.data);
    };

    fetchData();

  }, []);

  const presentCount = attendance.filter(a => a.status === "Present").length;
  const absentCount = attendance.filter(a => a.status === "Absent").length;

  return (
    <div className="container">

      <h1 className="title">Dashboard</h1>

      <div className="dashboard-grid">

        <div className="card">
          <h2>Total Employees</h2>
          <p>{employees.length}</p>
        </div>

        <div className="card">
          <h2>Total Present</h2>
          <p>{presentCount}</p>
        </div>

        <div className="card">
          <h2>Total Absent</h2>
          <p>{absentCount}</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;