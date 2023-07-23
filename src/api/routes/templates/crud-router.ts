import { Router } from "express";
import type { TModels } from "../../../database/entities";
import controllers from "../../controllers";

class CrudRouter {
  model: TModels;
  router = Router();

  constructor(model: TModels) {
    this.model = model;
    this.routes();
  }

  private routes() {
    const controller = new controllers[this.model](this.model);

    this.router.post("/create", controller.create);
    this.router.post("/create/many", controller.createMany);
    this.router.patch("/:id", controller.update);
    this.router.post("/update/many", controller.updateMany);
    this.router.delete("/:id", controller.delete);
    this.router.post("/delete/many", controller.deleteMany);
    this.router.get("/all", controller.getAll);
    this.router.post("/many", controller.getMany);
    this.router.get("/:id", controller.getOne);
  }

}

export default CrudRouter;