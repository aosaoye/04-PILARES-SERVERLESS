import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { json } from './model';
import { docClient, TABLE_NAME } from '../dynamo/dynamoClient';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  
  const { Items } = await docClient.send(new ScanCommand({
    TableName: TABLE_NAME
  }))
  console.log(`GET /events - Total eventos: ${Items?.length}`);
  return json(200, Items);
};
