import {TModels} from "../../database/entities";
import controllers from "../controllers";
import FollowerController from "../controllers/follower-controller";
import CrudRouter from "./templates/crud-router";

class FollowerRouter extends CrudRouter {
    constructor(model: TModels) {
        super(model);

        this.customRoutes();
    }

    private customRoutes(): void {
        const controller = new controllers[this.model](this.model);

        this.router.post("/toggle", (controller as FollowerController).saveOrRemove);
    }
}

export default FollowerRouter;