

export type EventStatus = 'CONFIRMED' | 'CANCELLED'

export interface FestivalEvent {
  id: string;
  artist: string;
  space: string;
  time: string;
  date?: string;
  location?: string;
  status: EventStatus;
}

export type EventInput = Omit<FestivalEvent, 'id'>;