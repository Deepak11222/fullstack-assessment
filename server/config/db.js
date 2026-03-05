const mongoose = require('mongoose');

const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
        
        
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
        
        
    }
    
}

module.exports = connectedDB