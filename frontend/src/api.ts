import Constants from 'expo-constants'

import type { EventInput, FestivalEvent } from './types/events';
import { validateEventPayload, validateJson } from './helpers/festivalValidation';


export const API_URL = `https://tmy1hbbbu9.execute-api.us-east-1.amazonaws.com/dev/`;
 
export const request = async <T = any>(path: string, method = 'GET', body?: unknown): 
Promise<T> => {
  const response = await fetch(API_URL + path, {
    method,
    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})
  });
  const value = await response.json();
  if (!response.ok) {
    const message = typeof value === 'object' && value !== null && 'message' in value
      ? String(value.message) : response.statusText;
    throw new Error('HTTP ' + response.status + ': ' + message);
  }
  return value as T;
}

export const getEvents = async (): Promise<FestivalEvent[]> => {
  const value = await request<FestivalEvent[]>('/events');
  if (!Array.isArray(value)) throw new Error('La API no devolvió una lista de actuaciones válida');
  return value;
}

export const createEvents = async(input: EventInput): 
Promise<FestivalEvent> =>
    request<FestivalEvent>('/events', 'POST', input)

export const replaceEvents = async(id: string, input: Partial<EventInput>): 
Promise<FestivalEvent> =>
    request<FestivalEvent>(`/events/${id}`, 'PUT', input)

export const updateEvents = async(id: string, input: Partial<EventInput>): 
Promise<FestivalEvent> =>
    request<FestivalEvent>(`/events/${id}`, 'PATCH', input)

export const deleteEvents = async(id: string): 
Promise<{ message: string; event: FestivalEvent }> =>
    request<{ message: string; event: FestivalEvent }>(`/events/${id}`, 'DELETE')


 
