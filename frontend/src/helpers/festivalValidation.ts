import { EventStatus, FestivalEvent } from '../types/events';

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  error?: string;
}

export const validateJson = (
  rawBody: string | null
): ValidationResult<Record<string, unknown>> => {
  try {
    const parsed = JSON.parse(rawBody ?? 'null');
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return { isValid: false, error: 'Se espera un objeto JSON' };
    }
    return { isValid: true, data: parsed as Record<string, unknown> };
  } catch {
    return { isValid: false, error: 'JSON Inválido' };
  }
};

export const isValidTime = (time: string): boolean => {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
};

export const isValidStatus = (status: string): status is EventStatus => {
  return status === 'CONFIRMED' || status === 'CANCELLED';
};



export const validateEventPayload = (
  data: Record<string, unknown>,
  isPartial = false
): ValidationResult<Partial<FestivalEvent>> => {
  if (!isPartial) {
    if (
      !('artist' in data) || typeof data.artist !== 'string' || !data.artist.trim() ||
      !('space' in data) || typeof data.space !== 'string' || !data.space.trim() ||
      !('time' in data) || typeof data.time !== 'string' || !isValidTime(data.time)
    ) {
      return { isValid: false, error: 'Faltan campos obligatorios' };
    }
  }

  if ('time' in data && typeof data.time === 'string' && !isValidTime(data.time)) {
    return { isValid: false, error: 'time debe tener formato HH:mm válido' };
  }

  if ('status' in data && typeof data.status === 'string' && !isValidStatus(data.status)) {
    return { isValid: false, error: 'El estado debe ser CONFIRMED o CANCELLED' };
  }

  return { isValid: true, data: data as unknown as Partial<FestivalEvent> };
};