import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import ApiError from "../utils/ApiError";

//bcrypt uses hashing and salt to obfiscate your password
const SALT = 10;

const _repository = mongoose.model("Admin", Admin);

class AdminService {
  async create(body) {
    //VALIDATE PASSWORD LENGTH
    if (!body.hasOwnProperty("password") || body.password.length < 6) {
      throw new ApiError("Password must be at least 6 characters", 400);
    }
    //CHANGE THE PASSWORD TO A HASHED PASSWORD
    body.hash = this.generateHash(body.password);
    //CREATE THE USER
    let admin = await _repository.create(body);
    //REMOVE THE PASSWORD BEFORE RETURNING
    delete admin._doc.hash;
    return admin;
  }
  async getByEmailAndLogin(body) {
    let admin = await _repository.findOne({ email: body.email });
    if (!admin) {
      throw new ApiError("Invalid Admin name Or Password");
    }
    //CHECK THE PASSWORD
    // @ts-ignore
    let valid = await admin.validatePassword(body.password);
    if (!valid) {
      throw new ApiError("Invalid Admin name Or Password");
    }
    //ALWAYS REMOVE THE PASSWORD FROM THE USER OBJECT
    delete admin._doc.hash;
    return admin;
  }

  async authenticate(id) {
    let admin = await _repository.findOne({ _id: id });
    if (!admin) {
      throw new ApiError("Please login to continue", 401);
    }
    delete admin._doc.hash;
    return admin;
  }
  generateHash(password) {
    return bcrypt.hashSync(password, SALT);
  }
}

const _adminService = new AdminService();
export default _adminService;
