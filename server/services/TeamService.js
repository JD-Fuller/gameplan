import mongoose from "mongoose";
import Team from "../models/Team";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Team", Team);

class TeamService {
  async getAll(adminId) {
    return await _repository.find({ authorId: adminId });
  }

  async getById(id, adminId) {
    let data = await _repository.findOne({ _id: id, authorId: adminId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this team", 400);
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
      throw new ApiError("Invalid ID or you do not own this team", 400);
    }
    return data;
  }

  async delete(id, adminId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: adminId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this team", 400);
    }
  }
}

const _teamService = new TeamService();
export default _teamService;
