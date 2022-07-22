import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

import middify from "../middify";
import formatJSONResponse from "../formatJsonResponse";
import { PeopleService } from "../service"

export const handler: Handler = middify(
  async (
    event: APIGatewayEvent & CreatePost,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const { peopleId,description } = event.body;

    try {
      const peopleService = new PeopleService(peopleId,description)
      const result = await peopleService.process({ 
        type: 'createPeopleDB'
      })
      if (typeof result === 'string') {
        return formatJSONResponse(400, result);
      } else {
        return formatJSONResponse(400, result);
      }
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);