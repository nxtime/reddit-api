import BookmarkController from "../controllers/bookmark-controller";
import CrudRouter from "./templates/crud-router";
import { TModels } from "../../database/entities";
import controllers from "../controllers";

class BookmarkRouter extends CrudRouter {
  constructor(model: TModels) {
    super(model);
    this.customRoutes();
  }

  private customRoutes() {
    const controller = new controllers[this.model](this.model);

    this.router.post("/toggle", (controller as BookmarkController).saveOrRemove);
  }
}

export default BookmarkRouter;