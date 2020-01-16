import _playerRosterService from "../services/PlayerRosterService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class PlayerRosterController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      //only gets playerRosters by user who is logged in
      let data = await _playerRosterService.getAll(req.session.uid);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await _playerRosterService.getById(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _playerRosterService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _playerRosterService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _playerRosterService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
