require('dotenv').config();
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')

const errorHandler = require('./middleware/errorMiddleware')
const connectedDB = require('./config/db')
const app = express();

connectedDB()




app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fullstack-assessment-rose.vercel.app"
  ],
  methods: ["GET","POST","DELETE","PUT"],
  credentials: true
}));
app.use(express.json());

app.use('/api/employee',employeeRoutes);
app.use('/api/attendance',attendanceRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})