
export interface EventDataInterface {
    id: number;
    name: string;
    desc: string;
    regLink: string;
    startDateTime: string;
    endDateTime: string;
    address: string;
    hostId: number;
    attendees: number;
}

export interface Event {
  id: number | null;
  name: string;
  desc: string;
  reglink: string;
  startdatetime: string;
  enddatetime: string;
  address: string;
  hostId: string | null;
}

export interface GetAdminEventResponse {
  events: Array<Event>
}

export interface GetEventMessageResponse {
  message : string | null
  error : string | null
}
