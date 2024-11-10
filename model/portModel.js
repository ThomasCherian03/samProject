import mongoose from "mongoose";

const containerSchema = new mongoose.Schema({
  containerName: 
  {
    type : String,
    required : true
  },
  containerImage: {
    type : String,
    required : true
  },
  containerPort: {
    type : Number,
    required : true
  },
  isActive: 
  {
    type : Boolean,
    default : 0
  }
});

const dataSchema = new mongoose.Schema({
  containers: [containerSchema]
});

const network = mongoose.model("Networks",dataSchema)
export default network
