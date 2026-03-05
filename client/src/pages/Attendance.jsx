import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Attendance = () => {

  const API_EMP = "http://localhost:5000/api/employee";
  const API_ATT = "http://localhost:5000/api/attendance";

  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present"
  });

  const [loading, setLoading] = useState(false);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_EMP);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  // Fetch Attendance
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(API_ATT);
      setRecords(res.data);
    } catch (error) {
      console.error("Error loading attendance:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Mark Attendance
  const markAttendance = async (e) => {
    e.preventDefault();

    if (!form.employee || !form.date) {
      alert("Please select employee and date");
      return;
    }

    try {

      setLoading(true);

      await axios.post(API_ATT, form);

      fetchAttendance();

      setForm({
        employee: "",
        date: "",
        status: "Present"
      });

      alert("Attendance marked successfully");

    } catch (error) {

      console.error(error);
      alert(error.response?.data?.message || "Error marking attendance");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1 className="title">Attendance</h1>

      {/* Attendance Form */}
      <div className="card">

        <form className="form" onSubmit={markAttendance}>

          <select
            name="employee"
            value={form.employee}
            onChange={handleChange}
            required
          >

            <option value="">Select Employee</option>

            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName}
              </option>
            ))}

          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Mark Attendance"}
          </button>

        </form>

      </div>

      {/* Attendance Records */}
      <div className="card">

        <h2>Attendance Records</h2>

        <table>

          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {records.length === 0 ? (

              <tr>
                <td colSpan="3">No attendance records</td>
              </tr>

            ) : (

              records.map(record => (

                <tr key={record._id}>

                  <td>
                    {record.employee?.fullName || record.employee}
                  </td>

                  <td>
                    {new Date(record.date).toLocaleDateString()}
                  </td>

                  <td>
                    {record.status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Attendance;