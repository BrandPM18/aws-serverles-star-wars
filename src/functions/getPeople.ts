
import {
  APIGatewayEvent,
  Handler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../middify";
import formatJSONResponse from "../formatJsonResponse";
import { getInfoPeople } from "../network/request"
import { PeopleService } from "../services"
export const handler: Handler = middify(
  async (
    event: APIGatewayEvent
  ): Promise<APIGatewayProxyResult> => {
    const peopleId: string = event.pathParameters.peopleId;
    try {
      console.log(peopleId)
      const posts = await getInfoPeople(peopleId,"problems");
      console.log(posts)
      return formatJSONResponse(200, peopleId);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);