import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json } from './model';
import { docClient, TABLE_NAME } from '../dynamo/dynamoClient';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log(`GET /events/${id}`);

  if (!id) {
    return json(400, { message: 'Error ID no proporcionado' });
  }

  const foundEvent = await docClient.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }))
  if (!foundEvent.Item) {
    return json(404, { message: 'Evento no encontrado' });
  }

  return json(200, foundEvent.Item);
};
