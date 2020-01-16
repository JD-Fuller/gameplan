import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const PlayerRoster = new Schema(
  {
    playerId: { type: ObjectId, ref: "Player", required: true },
    rosterId: { type: ObjectId, ref: "Roster", required: true },
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

export default PlayerRoster;
