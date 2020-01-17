import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Player = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    grade: { type: String, required: true },
    jerseyNumber: { type: Number },
    homeCity: { type: String, default: "City" },
    homeState: { type: String, default: "State" },
    teamId: { type: ObjectId, ref: "Team", required: true },
    authorId: { type: ObjectId, ref: "Admin", required: true },
    imgURL: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true }
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

export default Player;
