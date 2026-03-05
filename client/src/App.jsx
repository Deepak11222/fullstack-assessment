import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

const App = () => {

  return (
    <Router>

      <Navbar />

      <main className="page-container">

        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />

        </Routes>

      </main>

    </Router>
  );

};

export default App;