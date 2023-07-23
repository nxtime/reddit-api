import BookmarkService from "./bookmark-service";
import FollowerService from "./follower-service";
import CrudServices from "./templates/crud-services";
import PostService from "./post-service";
import { TModels } from "../../database/entities";

const services: {
  [Key in TModels]: typeof CrudServices | typeof PostService | typeof BookmarkService | typeof FollowerService
} = {
  user: CrudServices,
  post: PostService,
  comment: CrudServices,
  follower: FollowerService,
  bookmark: BookmarkService,
};

export default services;