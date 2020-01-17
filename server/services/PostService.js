import mongoose from "mongoose";
import Post from "../models/Post";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Post", Post);

class PostService {
  async getAll(adminId) {
    return await _repository.find({ authorId: adminId });
  }

  async getById(id, adminId) {
    let data = await _repository.findOne({ _id: id, authorId: adminId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this post", 400);
    }
    return data;
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(postData) {
    let data = await _repository.findOneAndUpdate(
      { _id: postData.id, authorId: postData.authorId },
      { content: postData.content },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this post", 400);
    }
    return data;
  }

  async delete(id, adminId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: adminId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this post", 400);
    }
  }
}

const _postService = new PostService();
export default _postService;
