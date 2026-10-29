import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FestivalEvent, json, readBody } from './model';
import { validateEventPayload } from '../helpers/validate';
import { docClient, TABLE_NAME } from '../dynamo/dynamoClient';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) {
    return json(400, { message: 'Error ID no proporcionado' });
  }

  const eventIndex = await docClient.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }))
  if (!eventIndex.Item) {
    return json(404, { message: 'Evento no encontrado' });
  }

  const body = readBody(event.body);
  if (!body) {
    return json(400, { message: 'JSON Inválido o se esperaba un objeto' });
  }

  const validation = validateEventPayload(body);
  if (!validation.isValid || !validation.data) {
    return json(400, { message: validation.error ?? 'Faltan campos obligatorios' });
  }

  const payload = validation.data;
  const replacedEvent: FestivalEvent = {
    id,
    artist: payload.artist!.trim(),
    space: payload.space!.trim(),
    time: payload.time!,
    status: payload.status ?? 'CONFIRMED',
    ...(payload.date ? { date: payload.date } : {}),
    ...(payload.location ? { location: payload.location } : {}),
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: replacedEvent
  }))
  console.log(`PUT /events/${id} - Evento reemplazado`);

  return json(200, replacedEvent);
};
