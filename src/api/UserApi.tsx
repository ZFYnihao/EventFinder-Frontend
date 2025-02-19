import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";

const BASE_URL = "http://127.0.0.1:8000/user";

export async function addUsers(userData : User, token : string): Promise<User[]> {
    const response: AxiosResponse<User[]> = await axios.post(`${BASE_URL}/users`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
    return response.data;
}

// export async function createUser(newUser: Omit<User, "id">): Promise<User> {
//     const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/users`, newUser);
//     return response.data;
// }