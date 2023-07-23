import BookmarkController from "./bookmark-controller";
import FollowerController from "./follower-controller";
import CrudController from "./templates/crud-controller";
import PostController from "./post-controller";
import { TModels } from "../../database/entities";

const controllers: {
  [Key in TModels]: typeof CrudController | typeof PostController | typeof BookmarkController | typeof FollowerController;
} = {
  user: CrudController,
  post: PostController,
  bookmark: BookmarkController,
  comment: CrudController,
  follower: FollowerController,
};

export default controllers;