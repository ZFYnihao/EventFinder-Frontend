import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";

const BASE_URL = "https://example.com/api";

// export async function fetchUsers(): Promise<User[]> {
//     const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/users`);
//     return response.data;
// }

// export async function createUser(newUser: Omit<User, "id">): Promise<User> {
//     const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/users`, newUser);
//     return response.data;
// }