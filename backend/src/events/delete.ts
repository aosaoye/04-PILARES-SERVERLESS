import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json } from './model';
import { docClient, TABLE_NAME } from '../dynamo/dynamoClient';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) {
    return json(400, { message: 'Error ID no proporcionado' });
  }

  await docClient.send(new DeleteCommand({
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }))
  
  console.log(`DELETE /events/${id} - Evento eliminado`);

  return json(200, {
    message: 'Evento eliminado correctamente',
    event: id,
  });
};
