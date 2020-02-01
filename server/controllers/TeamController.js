import _teamService from "../services/TeamService";
import express from "express";
import _eventService from "../services/EventService";
import _postService from "../services/PostService";
import _playerService from "../services/PlayerService";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class TeamController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/events", this.getEventsByTeamId)
      .get("/:id/posts", this.getPostsByTeamId)
      .get("/:id/players", this.getPlayersByTeamId)
      .use(Authorize.authenticated)
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
      //only gets teams by user who is logged in
      let data = await _teamService.getAll(req.session.uid);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await _teamService.getById(req.params.id, req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getEventsByTeamId(req, res, next) {
    try {
      let data = await _eventService.getEventsByTeamId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getPostsByTeamId(req, res, next) {
    try {
      let data = await _postService.getPostsByTeamId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getPlayersByTeamId(req, res, next) {
    try {
      let data = await _playerService.getPlayersByTeamId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // req.body.teamId = Math.random()
      //   .toString(36)
      //   .substring(7);
      req.body.authorId = req.session.uid;
      let data = await _teamService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _teamService.edit(
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
      await _teamService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
