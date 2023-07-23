import CrudServices from "./templates/crud-services";
import { TModels } from "../../database/entities";

class FollowerService extends CrudServices {
  constructor(model: TModels) {
    super(model);
  }

  saveOrRemove = async (followerId: number, followingId: number) => {
    const follower = await this.repository.findOne({ where: { followerId, followingId } } as any);

    if (follower) {
      await this.repository.delete(follower.id);
      return { following: false };
    }

    await (this.repository as any).save({ followerId, followingId });

    return { following: true };
  };
}

export default FollowerService;