const mongoose = require("mongoose")

// const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"

const mongoURI = "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/Company?retryWrites=true&w=majority"

const connectToMongo = () => {
  mongoose.connect(mongoURI,()=> {
    console.log("connected to mongo successfully");
  })
}

module.exports = connectToMongo 