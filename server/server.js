require('dotenv').config();
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')

const errorHandler = require('./middleware/errorMiddleware')
const connectedDB = require('./config/db')
const app = express();

connectedDB()




// server.js (replace existing cors block with this)
const allowedOrigins = [
  "http://localhost:5173",
  "https://fullstack-assessment-rose.vercel.app" // add your stable production domain if any
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);


    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ensure preflight requests are handled for all routes
app.options('*', cors());
app.use(express.json());

app.use('/api/employee',employeeRoutes);
app.use('/api/attendance',attendanceRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})