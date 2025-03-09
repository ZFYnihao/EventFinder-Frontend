import { Friend } from "./Friend";

export interface Event {
  id: number | null;
  name: string;
  desc: string;
  reglink: string;
  startdatetime: string;
  enddatetime: string;
  address: string;
  hostid: string | null;
}

export interface AllEvent extends Event {
  noOfAttendees : number;
  attendeesFriends : Array<Friend>
}

export interface GetEventsResponse {
  events: Array<AllEvent>
}

export interface GetAdminEventResponse {
  events: Array<Event>
}

export interface GetEventMessageResponse {
  message : string | null
  error : string | null
}
