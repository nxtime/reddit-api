import { BookMark } from "./bookmark.entity";
import { Comment } from "./comment.entity";
import { Follower } from "./follower.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

const models = {
  user: User,
  follower: Follower,
  post: Post,
  comment: Comment,
  bookmark: BookMark,
};

export const modelsRelations: { [Key in TModels]: string[] } = {
  comment: ["user"],
  follower: ["user"],
  post: ["user", "comments", "likes"],
  user: ["posts", "followers.follower", "following.following", "comments", "likes", "bookmarks"],
  bookmark: [],
};

export type TModels = keyof typeof models;

export type TModelTypes = InstanceType<typeof models[TModels]>;

export default models;
