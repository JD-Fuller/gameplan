import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Fan = new Schema(
  {
    name: { type: String, required: true },
    conteemailnt: { type: String, required: true }
    // authorId: { type: ObjectId, ref: "Admin", required: true }
  },
  { timestamps: true }
);

export default Note;
