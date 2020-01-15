import express from "express";
import { Authorize } from "../middleware/authorize";
import _adminService from "../services/AdminService";

//PUBLIC
export default class AdminController {
  constructor() {
    this.router = express
      .Router()
      .post("/register", this.register)
      .post("/login", this.login)
      .use(Authorize.authenticated)
      .get("/authenticate", this.authenticate)
      .delete("/logout", this.logout)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }
  async register(req, res, next) {
    try {
      let admin = await _adminService.create(req.body);
      //SET THE SESSION UID (SHORT FOR USERID)
      req.session.uid = admin._id;
      res.status(201).send(admin);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      let admin = await _adminService.getByEmailAndLogin(req.body);
      //SET THE SESSION UID (SHORT FOR USERID)
      req.session.uid = admin._id;
      res.send(admin);
    } catch (err) {
      next(err);
    }
  }

  async authenticate(req, res, next) {
    try {
      let admin = await _adminService.authenticate(req.session.uid);
      res.send(admin);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy(err => {
        if (err) {
          return res.send(err);
        }
        return res.send({
          message: "Logout Successful"
        });
      });
    } catch (error) {
      next(error);
    }
  }
}
