import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
   username: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
    trim: true,
    index: true
   },
   email: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
    trim: true,
   },
   password: {
        type: String,
        require: true
   },
},{timestamps: true})

export const user = mongoose.model("user",userSchema);
