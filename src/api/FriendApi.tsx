import axios, { AxiosResponse } from "axios";
import { GetFriendResponse, GetFriendRequest } from "../types/Friend";

const BASE_URL = "http://127.0.0.1:8000/user";

export async function getFriends(token : string): Promise<GetFriendResponse> {
  const response: AxiosResponse<GetFriendResponse> = await axios.get(`${BASE_URL}/friend`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  return response.data;
}

export async function getFriendsRequest(token : string): Promise<GetFriendRequest> {
    const response: AxiosResponse<GetFriendRequest> = await axios.get(`${BASE_URL}/friend/request`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
    return response.data;
}
