import { TModelTypes, TModels } from "../../database/entities";
import CrudServices from "./templates/crud-services";


class PostService extends CrudServices {
  constructor(model: TModels) {
    super(model);
  }

  async getComments(postId: number): Promise<any[]> {
    const data = await this.repository.manager.query(`
      SELECT
        comment.id,
        comment.content,
        json(json_object(
            'id', "user".id,
            'avatar_url', "user".avatar_url,
            'firstName', "user".firstName,
            'lastName', "user".lastName
        )) AS user,
        comment.created_at,
        comment.updated_at
      FROM comment
      INNER JOIN "user" ON comment.userId = "user".id
      WHERE comment.postId = ${postId}
      ORDER BY comment.created_at ASC;
    `);

    const response = data.map((item: any) => ({
      ...item,
      user: JSON.parse(item.user)
    }));

    return response;
  }

  async getAll(): Promise<TModelTypes[]> {

    const data = await this.repository.manager.query(`
      SELECT
        post.id,
        post.title,
        post.content,
        json((
            SELECT json_object(
                'content', comment.content,
                'user', json_object(
                    'id', user_comment.id,
                    'avatar_url', user_comment.avatar_url,
                    'firstName', user_comment.firstName,
                    'lastName', user_comment.lastName
                ),
                'created_at', comment.created_at,
                'updated_at', comment.updated_at
            )
            FROM comment
            INNER JOIN "user" AS user_comment ON comment.userId = user_comment.id
            WHERE post.id = comment.postId
            ORDER BY comment.created_at ASC
            LIMIT 1
        )) AS firstComment,
        post.created_at,
        post.updated_at,
        json(json_object(
            'id', "user".id,
            'avatar_url', "user".avatar_url,
            'firstName', "user".firstName,
            'lastName', "user".lastName
        )) AS user,
        (
          SELECT COUNT(*) FROM comment WHERE comment.postId = post.id
        ) AS commentCount
    FROM post
    INNER JOIN "user" ON post.userId = "user".id
    ORDER BY post.created_at DESC;
  `);

    const response = data.map((item: any) => ({
      ...item,
      firstComment: JSON.parse(item.firstComment),
      user: JSON.parse(item.user)
    }));

    return response;
  }
}

export default PostService;
