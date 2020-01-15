import mongoose from "mongoose";
import Roster from "../models/Roster";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Roster", Roster);

class RosterService {
  async getAll(adminId) {
    return await _repository.find({ authorId: adminId });
  }

  async getById(id, adminId) {
    let data = await _repository.findOne({ _id: id, authorId: adminId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this roster", 400);
    }
    return data;
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, adminId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: adminId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this roster", 400);
    }
    return data;
  }

  async delete(id, adminId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: adminId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this roster", 400);
    }
  }
}

const _rosterService = new RosterService();
export default _rosterService;
