const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/Basha")
    .then(() => {
        console.log("mongodb connected ");
    })
    .catch(() => {
        console.log("failed to connect");
    })

// Create the LogInSchema for the collection
const LogInSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

// Create the Collection1 model based on the LogInSchema
const collection = new mongoose.model("Collection1", LogInSchema);

// Export the Collection1 model
module.exports = collection;
