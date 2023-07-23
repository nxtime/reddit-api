import { Request, Response } from "express";
import BookmarkService from "../services/bookmark-service";
import CrudController from "./templates/crud-controller";
import { TModels } from "../../database/entities";

class BookmarkController extends CrudController {
  constructor(model: TModels) {
    super(model);
  }

  saveOrRemove = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const { postId } = req.body;
      const bookmark = await (this.service as BookmarkService).saveOrRemove(Number(userId), Number(postId));
      res.status(200).json(bookmark);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  };
}

export default BookmarkController;