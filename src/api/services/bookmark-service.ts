import CrudServices from "./templates/crud-services";
import { TModels } from "../../database/entities";

class BookmarkService extends CrudServices {
  constructor(model: TModels) {
    super(model);
  }

  saveOrRemove = async (userId: number, postId: number) => {
    const bookmark = await this.repository.findOne({ where: { userId, postId } } as any);

    if (bookmark) {
      await this.repository.delete(bookmark.id);
      return { bookmarked: false };
    }

    await (this.repository as any).save({ userId, postId });

    return { bookmarked: true };
  };
}

export default BookmarkService;