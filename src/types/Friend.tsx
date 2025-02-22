export interface Friend {
    fullname: string;
    email: string;
}

export interface GetFriendResponse {
    friends : Array<Friend>;
}

export interface GetFriendRequestResponse {
    friendRequests : Array<Friend>;
}