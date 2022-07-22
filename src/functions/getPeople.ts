
import {
  APIGatewayEvent,
  Handler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middify from '../middify'
import formatJSONResponse from '../formatJsonResponse'
import { PeopleService } from "../service"
export const handler: Handler = middify(
  async (
    event: APIGatewayEvent
  ): Promise<APIGatewayProxyResult> => {
    const peopleId: string = event.pathParameters.peopleId;
    try {
      const peopleService = new PeopleService(peopleId,null)
      const result = await peopleService.process({ 
        type: 'getPeopleWithID'
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