import { BookMark } from "./entities/bookmark.entity";
import { Comment } from "./entities/comment.entity";
import DatabaseProvider from "./connection";
import { Follower } from "./entities/follower.entity";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";

const repositories = {
  user: DatabaseProvider.getRepository(User),
  post: DatabaseProvider.getRepository(Post),
  comment: DatabaseProvider.getRepository(Comment),
  follower: DatabaseProvider.getRepository(Follower),
  bookmark: DatabaseProvider.getRepository(BookMark),
};

export default {
  ...repositories
};