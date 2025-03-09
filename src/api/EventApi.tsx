import axios, { AxiosResponse } from "axios";
import { GetAdminEventResponse, GetEventMessageResponse, Event ,GetEventsResponse} from "../types/Event";

const BASE_URL = "http://127.0.0.1:8000/event";

export async function getAdminEvent(token : string): Promise<GetAdminEventResponse> {
    const response: AxiosResponse<GetAdminEventResponse> = await axios.get(`${BASE_URL}/admin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data;
}

export async function getAdminEventAttendees(
    token: string,
    eventId: number | null
  ): Promise<Blob> {
    const response: AxiosResponse<Blob> = await axios.get(`${BASE_URL}/${eventId}/csv`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", 
    });
  
    return response.data;
}

export async function createEvent(token : string, event: Event): Promise<Event> {
    const response: AxiosResponse<Event> = await axios.post(`${BASE_URL}/add`, event, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data;
}

export async function updateEvent(token : string, eventId: number | null, event: Event): Promise<Event> {
    const response: AxiosResponse<Event> = await axios.put(`${BASE_URL}/${eventId}/update`, event, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data;
}

export async function deleteEvent(token : string, eventId: number | null): Promise<GetEventMessageResponse> {
    const response: AxiosResponse<GetEventMessageResponse> = await axios.delete(`${BASE_URL}/${eventId}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data;
}





//all event page:

export async function getAllEvents(token: string): Promise<GetEventsResponse> {
  const response: AxiosResponse<GetEventsResponse> = await axios.get(`${BASE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
}
