import React, { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import profilePic from "../assets/ProfilePic.png";
import { useInfo } from "../UserInfo";
import { Friend, GetFriendMessageResponse } from "../types/Friend";
import { getFriends, getFriendsRequest, sendFriendsRequest, acceptFriendsRequest, declineFriendsRequest, deleteFriend } from "../api/FriendApi";
import { getUsers } from "../api/UserApi";
import { User } from "../types/User";

const ProfilePage: React.FC = () => {
    const { state } = useInfo();
    const [friends, setFriends] = useState<Array<Friend>>([]);
    const [friendRequests, setFriendRequests] = useState<Array<Friend>>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    if (!state.isLogin) {
        return <h2>Access Denied. Please log in to view this page.</h2>;
    }
    
    useEffect(() => {
        const fetchFriends = async () => {
            if (!state.user?.token) {
                console.warn("Token is missing. Skipping API call.");
                return;
            }
    
            try {
                const response = await getFriends(state.user.token);
                if (Array.isArray(response.friends)) {
                    setFriends(response.friends);
                } else {
                    console.error("Unexpected response format:", response);
                    setFriends([]); 
                }
            } catch (error) {
                console.error("Failed to get friends:", error);
                setFriends([]);
            }
        };

        const fetchFriendRequests = async () => {
            if (!state.user?.token) {
                console.warn("Token is missing. Skipping API call.");
                return;
            }
    
            try {
                const response = await getFriendsRequest(state.user.token);
                if (Array.isArray(response.friendRequests)) {
                    setFriendRequests(response.friendRequests);
                } else {
                    console.error("Unexpected response format:", response);
                    setFriendRequests([]); 
                }
            } catch (error) {
                console.error("Failed to get friend requests:", error);
                setFriendRequests([]);
            }
        };
    
        fetchFriends();
        fetchFriendRequests();
    }, [state.user?.token, refreshTrigger]); 

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<User>>([]);
    const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (searchQuery == ""){
                setSearchResults([]);
            }else{
                getUsers(searchQuery, state.user?.token ?? "").then((response: Array<User>) => {
                    if (Array.isArray(response)) {
                        setSearchResults(response);
                    } else {
                        console.error("Unexpected response:", response);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
            }
        }
    };

    const sendFriendRequest = (user: User) => {
        sendFriendsRequest(state.user?.token ?? "", user.id).then((response: GetFriendMessageResponse) => {
            if (response.message === "Friend request sent") {
                setSentRequests((prev) => new Set(prev).add(user.id));
                alert(`Friend request sent to ${user.fullname}!`);
            } else {
                alert(`Friend request failed: ${response.error || "Unknown error"}!`);
            }
        })
        .catch((error) => {
            console.error("Friend request failed:", error);
        });
    };

    const acceptFriendRequest = (user: Friend) => {
        console.log("user.id")
        console.log(user.id)
        acceptFriendsRequest(state.user?.token ?? "", user.id).then((response: GetFriendMessageResponse) => {
            if (response.message === "Friend request accepted") {
                setRefreshTrigger((prev) => !prev); 
            } else {
                alert(`Accepted Friend Request error: ${response.error}!`);
            }
        })
        .catch((error) => {
            console.error("Accept Friend Request Error:", error);
        });
    };

    const declineFriendRequest = (user: Friend) => {
        declineFriendsRequest(state.user?.token ?? "", user.id).then((response: GetFriendMessageResponse) => {
            if (response.message === "Friend request declined") {
                setRefreshTrigger((prev) => !prev); 
            } else {
                alert(`Declined Friend Request error: ${response.error}!`);
            }
        })
        .catch((error) => {
            console.error("Decline Friend Request Error:", error);
        });
    };

    const removeFriend = (user : Friend) => {
        deleteFriend(state.user?.token ?? "", user.id).then((response: GetFriendMessageResponse) => {
            if (response.message === "Friend removed") {
                setRefreshTrigger((prev) => !prev); 
            } else {
                alert(`Remove Friend error: ${response.error}!`);
            }
        })
        .catch((error) => {
            console.error("Remove Friend Error:", error);
        });
    }

    return (
        <div className={styles.profileWrapper}>
            <h2 className={styles.profileTitle}>My Profile</h2>
            <hr className={styles.profileDivider} />

            <div className={styles.profileContainer}>
                {/* Left part: User Information */}
                <div className={styles.profileHeader}>
                    <img src={state.user?.picture || profilePic} alt="Profile" className={styles.profileImg} referrerPolicy="no-referrer"/>
                    <h3>{state.user?.name}</h3>
                    <p className="text-muted">{state.user?.email}</p>
                    <p className="mb-5" style={{ color: "#e672d0", fontSize: "1.2rem", fontWeight: "bold" }}>
                        {friends.length} Friends
                    </p>
                </div>

                {/* Right part: Friends & Requests */}
                <div className={styles.friendRequests}>
                    <div className="row mt-4">
                        {/* Friend List */}
                        <div className={`col-md-5 ${styles.friendsSection}`}>
                            <h4>Friends:</h4>
                            <div className={styles.friendsList}>
                                <ul className="list-unstyled">
                                    {friends.map((friend) => (
                                        <li key={friend.id} className={styles.friendItem}>
                                            <img src={profilePic} alt="Friend" className={styles.friendImg} />
                                            {friend.fullname} ({friend.email})
                                            <div>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeFriend(friend)}>-</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Pending Requests */}
                        <div className={`col-md-6 ${styles.pendingRequestsSection}`}>
                            <h4>Pending Requests:</h4>
                            <div className={styles.pendingRequestsList}>
                                <ul className="list-unstyled">
                                    {friendRequests.map((friend) => (
                                        <li key={friend.id} className={`${styles.friendItem} d-flex align-items-center`}>
                                            <img src={profilePic} alt="Friend" className={styles.friendImg} />
                                            {friend.fullname} ({friend.email})
                                            <div className={styles.friendActions}>
                                                <button className="btn btn-success btn-sm" onClick={() => acceptFriendRequest(friend)}>✔</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => declineFriendRequest(friend)}>✖</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Friend Search & Send Request */}
                    <div className={`text-center mt-3 ${styles.sendRequestContainer}`}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        {searchResults.length > 0 && (
                            <div className={styles.searchResults}>
                                {searchResults.map((user) => (
                                    <div key={user.id} className={`${styles.friendItem} d-flex align-items-center`}>
                                        <img src={profilePic} alt="User" className={styles.friendImg} />
                                        {user.fullname}({user.email})
                                        <button
                                            className="btn btn-primary btn-sm ml-2"
                                            onClick={() => sendFriendRequest(user)}
                                            disabled={sentRequests.has(user.id)}
                                        >
                                            {sentRequests.has(user.id) ? "Request Sent" : "Send Request"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
