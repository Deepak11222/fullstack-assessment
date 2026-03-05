const Employee = require('../models/Employee');

exports.createEmployees = async (req,res)=>{

 const {employeeId,fullName,email,department}=req.body

 if(!employeeId || !fullName || !email || !department){
  return res.status(400).json({message:"All fields required"})
 }

 const emailRegex=/^\S+@\S+\.\S+$/

 if(!emailRegex.test(email)){
  return res.status(400).json({message:"Invalid email"})
 }

 const exists=await Employee.findOne({employeeId})

 if(exists){
  return res.status(400).json({message:"Employee already exists"})
 }

 const employee=await Employee.create(req.body)

 res.status(201).json(employee)
}

exports.getEmployees = async (req,res) => {
    try {
        const employee = await Employee.find();
        res.json(employee);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
    
}

exports.deleteEmployees = async (req,res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({message:"Employee Deleted"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}