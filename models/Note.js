const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: { // it will give the data or info of particular user.
    type : mongoose.Schema.Types.ObjectId,
    ref:"user"
  },


  title:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required: true,
  },
  tag:{
    type:String,
    default: "General"
  },
  date:{
    type:Date,
    default:Date.now
  }

});
// const Notes = mongoose.model("notes",NotesSchema)
// module.exports = Notes
module.exports = mongoose.model("notes",NotesSchema)