import mongoose from "mongoose";
import Event from "../models/Event";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Event", Event);

class EventService {
  async getAllEvents() {
    return await _repository.find({});
  }
  async getById(id, userId) {
    let data = await _repository.findOne({ _id: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async create(eventData) {
    let data = await _repository.create(eventData);
    return data;
  }

  async delete(id, adminId) {
    let data = await _repository.findOneAndDelete({
      _id: id,
      authorId: adminId
    });
    if (!data) {
      throw new ApiError("Invalid ID - Get out of here!", 420);
    }
  }

  async edit(eventData) {
    let data = await _repository.findOneAndUpdate(
      { _id: eventData.id },
      { title: eventData.title, description: eventData.description },
      { new: true }
      //Check requirements for findoneandupdate in mongoose docs
    );
    if (!data) {
      throw new ApiError("Unable to edit event", 420);
    }
  }
}

const _eventService = new EventService();
export default _eventService;
