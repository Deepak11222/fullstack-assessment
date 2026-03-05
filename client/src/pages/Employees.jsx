import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"

function Employees(){

 const API = "https://fullstack-assessment-agg9.onrender.com/api/employee"

 const [employees,setEmployees]=useState([])

 const [form,setForm]=useState({
  employeeId:"",
  fullName:"",
  email:"",
  department:""
 })

 const [error,setError]=useState("")

 const fetchEmployees=async()=>{
  const res=await axios.get(API)
  setEmployees(res.data)
 }

 useEffect(()=>{
  fetchEmployees()
 },[])

 const handleChange=(e)=>{
  setForm({
   ...form,
   [e.target.name]:e.target.value
  })
 }

 const validate=()=>{

  if(!form.employeeId || !form.fullName || !form.email || !form.department){
   return "All fields are required"
  }

  const emailRegex=/^\S+@\S+\.\S+$/

  if(!emailRegex.test(form.email)){
   return "Invalid email format"
  }

  return null
 }

 const addEmployee=async(e)=>{
  e.preventDefault()

  const validationError=validate()

  if(validationError){
   setError(validationError)
   return
  }

  try{

   await axios.post(API,form)

   setForm({
    employeeId:"",
    fullName:"",
    email:"",
    department:""
   })

   setError("")

   fetchEmployees()

  }catch(err){
   setError(err.response?.data?.message || "Error")
  }

 }

 const deleteEmployee=async(id)=>{

  if(!window.confirm("Delete employee?")) return

  await axios.delete(`${API}/${id}`)

  fetchEmployees()
 }

 return(

  <div>

   <h1 className="title">Employees</h1>

   <div className="card">

   <form className="form" onSubmit={addEmployee}>

  <div className="form-group">
    <label>
      Employee ID <span className="required">*</span>
    </label>
    <input
      type="text"
      name="employeeId"
      value={form.employeeId}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>
      Full Name <span className="required">*</span>
    </label>
    <input
      type="text"
      name="fullName"
      value={form.fullName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>
      Email <span className="required">*</span>
    </label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>
      Department <span className="required">*</span>
    </label>
    <input
      type="text"
      name="department"
      value={form.department}
      onChange={handleChange}
      required
    />
  </div>

  <button>Add Employee</button>

</form>
    {error && (
     <p style={{color:"red"}}>{error}</p>
    )}

   </div>

   <div className="card">

    <h2>Employee List</h2>

    {employees.length===0 ? (
     <p>No employees found</p>
    ):(
     <table>

      <thead>
       <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Action</th>
       </tr>
      </thead>

      <tbody>

       {employees.map(emp=>(
        <tr key={emp._id}>

         <td>{emp.employeeId}</td>
         <td>{emp.fullName}</td>
         <td>{emp.email}</td>
         <td>{emp.department}</td>

         <td>
          <button
           onClick={()=>deleteEmployee(emp._id)}
           style={{background:"#dc3545"}}
          >
           Delete
          </button>
         </td>

        </tr>
       ))}

      </tbody>

     </table>
    )}

   </div>

  </div>
 )
}

export default Employees