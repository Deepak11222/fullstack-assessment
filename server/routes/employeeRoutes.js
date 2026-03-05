const express = require('express');
const router = express.Router();

const {getEmployees,
    createEmployees,
    deleteEmployees} = require("../controllers/employeeController")

router.get("/", getEmployees);
router.post("/",createEmployees)
router.delete("/:id",deleteEmployees);

module.exports = router;