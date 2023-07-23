import models, { TModels } from "../../database/entities";
import BookmarkRouter from "./bookmark-router";
import CrudRouter from "./templates/crud-router";
import PostRouter from "./post-router";
import FollowerRouter from "./follower-router";
import { Router } from "express";
import tokenValidation from "../middlewares/token-validation";

const routes = Router();

const routers: {
  [Key in TModels]: typeof CrudRouter
} = {
  user: CrudRouter,
  post: PostRouter,
  comment: CrudRouter,
  follower: FollowerRouter,
  bookmark: BookmarkRouter,
};

// Create crud routes for each model
export const initializeCrudRoutes = () => {
  (Object.keys(models) as TModels[]).forEach((model) => {
    const crudRouter = new routers[model](model);

    routes.use(`/${model}`, tokenValidation, crudRouter.router);
  });
};

export default routes;