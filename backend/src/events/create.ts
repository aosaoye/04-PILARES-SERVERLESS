import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FestivalEvent, json, readBody } from './model';
import { validateEventPayload } from '../helpers/validate';
import { docClient, TABLE_NAME } from '../dynamo/dynamoClient';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = readBody(event.body);
  if (!body) {
    return json(400, { message: 'JSON Inválido o se esperaba un objeto' });
  }

  const validation = validateEventPayload(body);
  if (!validation.isValid || !validation.data) {
    return json(400, { message: validation.error ?? 'Faltan campos obligatorios' });
  }

  const payload = validation.data;
  const newEvent: FestivalEvent = {
    id: `EVT-${Date.now()}`,
    artist: payload.artist!.trim(),
    space: payload.space!.trim(),
    time: payload.time!,
    status: payload.status ?? 'CONFIRMED',
    ...(payload.date ? { date: payload.date } : {}),
    ...(payload.location ? { location: payload.location } : {}),
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: newEvent
  }))
  console.log(`POST /events - Evento creado: ${newEvent.id} (${newEvent.artist})`);

  return json(201, newEvent);
};
