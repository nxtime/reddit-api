import { Request, Response } from "express";
import CrudController from "./templates/crud-controller";
import PostService from "../services/post-service";
import { TModels } from "../../database/entities";
import logger from "../../utils/logger";

class PostController extends CrudController {
  constructor(model: TModels) {
    super(model);
  }

  getComments = async (req: Request, res: Response) => {
    try {
      const postId = req.params.id;
      const comments = await (this.service as PostService).getComments(Number(postId));

      res.status(200).json(comments);
    } catch (err: any) {
      logger.error(err.message);
      res.status(err.statusCode || 500);
    }
  };
}


export default PostController;