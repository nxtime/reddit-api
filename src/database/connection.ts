import { BookMark } from "./entities/bookmark.entity";
import { Comment } from "./entities/comment.entity";
import { DataSource } from "typeorm";
import { Follower } from "./entities/follower.entity";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";

const DatabaseProvider = new DataSource({
  type: "better-sqlite3",
  database: "./src/database/database.sqlite",
  synchronize: true,
  entities: [User, Post, Comment, Follower, BookMark],
  subscribers: [],
  migrations: [],
  //logging: true
});

export default DatabaseProvider;