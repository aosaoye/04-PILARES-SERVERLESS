import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {  FestivalEvent, json, readBody } from './model';
import { validateEventPayload } from '../helpers/validate';
import { docClient, TABLE_NAME } from '../dynamo/dynamoClient';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) {
    return json(400, { message: 'Error ID no proporcionado' });
  }

  const result = await docClient.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }))
  if (!result.Item) {
    return json(404, { message: 'Evento no encontrado' });
  }

  const existingEvent = result.Item as FestivalEvent;

  const body = readBody(event.body);
  if (!body) {
    return json(400, { message: 'JSON Inválido o se esperaba un objeto' });
  }

  const validation = validateEventPayload(body, true);
  if (!validation.isValid || !validation.data) {
    return json(400, { message: validation.error ?? 'Error de validación' });
  }

  const payload = validation.data;
  if (payload.artist !== undefined) existingEvent.artist = payload.artist.trim();
  if (payload.space !== undefined) existingEvent.space = payload.space.trim();
  if (payload.time !== undefined) existingEvent.time = payload.time;
  if (payload.status !== undefined) existingEvent.status = payload.status;
  if (payload.date !== undefined) existingEvent.date = payload.date;
  if (payload.location !== undefined) existingEvent.location = payload.location;

  await docClient.send(new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      id
    },
    UpdateExpression: 'SET #artist = :artist, #space = :space, #time = :time, #status = :status, #date = :date, #location = :location',
    ExpressionAttributeNames: {
      '#artist': 'artist',
      '#space': 'space',
      '#time': 'time',
      '#status': 'status',
      '#date': 'date',
      '#location': 'location'
    },
    ExpressionAttributeValues: {
      ':artist': existingEvent.artist,
      ':space': existingEvent.space,
      ':time': existingEvent.time,
      ':status': existingEvent.status,
      ':date': existingEvent.date,
      ':location': existingEvent.location
    }
  }))

  console.log(`PATCH /events/${id} - Evento actualizado`);

  return json(200, existingEvent);
};
