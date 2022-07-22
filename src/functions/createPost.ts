import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as uuid from "uuid";
import middify from "../middify";
import formatJSONResponse from "../formatJsonResponse";
import postService from "../database/service";

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & CreatePost,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const { title, description } = event.body;

    try {
      const postId: string = uuid.v4();
      const post = await postService.createPost({
        postId,
        title,
        description,
        active: true,
        createdAt: new Date().toISOString(),
      });

      return formatJSONResponse(201, post);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);