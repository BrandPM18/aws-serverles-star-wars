
import {
  APIGatewayEvent,
  Handler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../middify";
import formatJSONResponse from "../formatJsonResponse";
import postService from "../database/service";

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent
  ): Promise<APIGatewayProxyResult> => {
    const postId: string = event.pathParameters.postId;
    try {
      const posts = await postService.getPost(postId);

      return formatJSONResponse(200, posts);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);