export interface Friend {
    fullname: string;
    email: string;
}

export interface GetFriendResponse {
    friends : Array<Friend>;
}

export interface GetFriendRequest {
    friendRequests : Array<Friend>;
}