import { Friend } from "../types/Friend";
export interface EventDataInterface {
    id: number;
    name: string;
    host: string;
    description: string;
    
    startDateTime: string;
    endDateTime: string;
    time: string;
    location: string[];
    friends: Friend[];
    attendees: number;
  }