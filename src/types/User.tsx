export interface UserData {
    given_name: string;
    family_name: string;
    name: string;
    email: string;
    token: string;
    picture: string;
    is_admin: boolean;
}

export interface User {
    id: number;
    fullname: string;
    email: string;
}