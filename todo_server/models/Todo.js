import { model, Schema, Types } from "mongoose";

const TodoSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  completed:{
    type:Boolean,
    default:true
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Todo", TodoSchema);
