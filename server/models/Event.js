import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Event = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true || "TBA" },
    teamId: { type: String },
    location: { type: String || "TBA" },
    authorId: { type: ObjectId, ref: "Admin", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//CASCADE ON DELETE
Event.pre("deleteMany", function(next) {
  //lets find all the events and remove them
  Promise.all([
    //_taskService.deleteMany({ eventId: this._conditions_id }),
  ])
    .then(() => next())
    .catch(err => next(err));
});

//CASCADE ON DELETE
Event.pre("findOneAndRemove", function(next) {
  //lets find all the events and remove them
  Promise.all([
    // _taskRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err));
});

export default Event;
