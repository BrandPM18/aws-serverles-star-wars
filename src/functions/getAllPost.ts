import {
  Handler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../middify";
import formatJSONResponse from "../formatJsonResponse";
import postService from "../database/service";

export const handler: Handler = middify(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const posts = await postService.getAllPosts();

      return formatJSONResponse(200, posts);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);