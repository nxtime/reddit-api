import CrudRouter from "./templates/crud-router";
import PostController from "../controllers/post-controller";
import { TModels } from "../../database/entities";
import controllers from "../controllers";

class PostRouter extends CrudRouter {
  constructor(model: TModels) {
    super(model);
    this.customRoutes();
  }

  private customRoutes() {
    const controller = new controllers[this.model](this.model);

    this.router.get("/:id/comments", (controller as PostController).getComments);
  }
}

export default PostRouter;