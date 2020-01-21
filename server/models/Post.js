import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Post = new Schema(
  {
    content: { type: String, required: true },
    teamId: { type: ObjectId, ref: "Team" },
    authorId: { type: ObjectId, ref: "Admin", required: true }
  },
  { timestamps: true }
);

//CASCADE ON DELETE
// _schema.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     _listRepo.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Post;
