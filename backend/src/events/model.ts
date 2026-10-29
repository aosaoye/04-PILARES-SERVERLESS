import { APIGatewayProxyResult } from "aws-lambda";
import { validateJson } from "../helpers/validate";
import { docClient } from "../dynamo/dynamoClient";
  
export type EventStatus = 'CONFIRMED' | 'CANCELLED';

export interface FestivalEvent {
  id: string;
  artist: string;
  space: string;
  time: string;
  status: EventStatus;
  date?: string;
  location?: string;
}

export type EventInput = Omit<FestivalEvent, 'id'>


export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const json = (
  statusCode: number,
  value: unknown
): APIGatewayProxyResult => ({
  statusCode,
  headers: defaultHeaders,
  body: JSON.stringify(value)
})

export const readBody = (text: string | null):Record<string, unknown> | null => {
  const validation = validateJson(text)

  if (!validation.isValid || !validation.data) {
    return null
  }

  return validation.data
}
