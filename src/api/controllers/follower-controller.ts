import { Request, Response } from "express";
import FollowerService from "../services/follower-service";
import CrudController from "./templates/crud-controller";
import { TModels } from "../../database/entities";

class FollowerController extends CrudController {
  constructor(model: TModels) {
    super(model);
  }

  saveOrRemove = async (req: Request, res: Response) => {
    try {
      const { followerId } = req.body;
      const { followingId } = req.body;
      const bookmark = await (this.service as FollowerService).saveOrRemove(Number(followerId), Number(followingId));
      res.status(200).json(bookmark);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  };
}

export default FollowerController;