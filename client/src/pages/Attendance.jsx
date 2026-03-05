import { useState,useEffect } from "react"
import axios from "axios"
import "../App.css"

function Attendance(){

 const API_EMP="http://localhost:5000/api/employee"
 const API_ATT="http://localhost:5000/api/attendance"

 const [employees,setEmployees]=useState([])
 const [records,setRecords]=useState([])

 const [form,setForm]=useState({
  employeeId:"",
  date:"",
  status:"Present"
 })

 const fetchEmployees=async()=>{
  const res=await axios.get(API_EMP)
  setEmployees(res.data)
 }

 const fetchAttendance=async()=>{
  const res=await axios.get(API_ATT)
  setRecords(res.data)
 }

 useEffect(()=>{
  fetchEmployees()
  fetchAttendance()
 },[])

 const handleChange=(e)=>{
  setForm({
   ...form,
   [e.target.name]:e.target.value
  })
 }

 const markAttendance=async(e)=>{
  e.preventDefault()

  if(!form.employeeId || !form.date){
   alert("Select employee and date")
   return
  }

  await axios.post(API_ATT,form)

  fetchAttendance()

 }

 return(

  <div className="container">

   <h1 className="title">Attendance</h1>

   <div className="card">

    <form className="form" onSubmit={markAttendance}>

     <select
      name="employeeId"
      onChange={handleChange}
     >

      <option value="">Select Employee</option>

      {employees.map(emp=>(
       <option key={emp._id} value={emp.employeeId}>
        {emp.fullName}
       </option>
      ))}

     </select>

     <input
      type="date"
      name="date"
      onChange={handleChange}
     />

     <select
      name="status"
      onChange={handleChange}
     >
      <option>Present</option>
      <option>Absent</option>
     </select>

     <button>Mark Attendance</button>

    </form>

   </div>

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

      {records.map(r=>(
       <tr key={r._id}>
        <td>{r.employeeId}</td>
        <td>{new Date(r.date).toLocaleDateString()}</td>
        <td>{r.status}</td>
       </tr>
      ))}

     </tbody>

    </table>

   </div>

  </div>
 )
}

export default Attendance