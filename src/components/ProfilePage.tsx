import React, { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import profilePic from "../assets/ProfilePic.png";
import { Link } from "react-router-dom";
import { useInfo } from "../UserInfo";
import { Friend } from "../types/Friend";
import { mockFriends, mockUsers } from "../api/MockProfileData";
import { getFriends, getFriendsRequest } from "../api/FriendApi";

const ProfilePage: React.FC = () => {
    const { state } = useInfo();
    const [friends, setFriends] = useState<Array<Friend>>([]);
    const [friendRequests, setFriendRequests] = useState<Array<Friend>>([]);
    // const friends: Array<Friend> = mockFriends;
    useEffect(() => {
        const fetchFriends = async () => {
            if (!state.user?.token) {
                console.warn("Token is missing. Skipping API call.");
                return;
            }
    
            try {
                const response = await getFriends(state.user.token);
                console.log("response")
                console.log(response.friends)
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

        const fetchFriendReuest = async () => {
            if (!state.user?.token) {
                console.warn("Token is missing. Skipping API call.");
                return;
            }
    
            try {
                const response = await getFriendsRequest(state.user.token);
                console.log("response")
                console.log(response)
                if (Array.isArray(response.friendRequests)) {
                    setFriendRequests(response.friendRequests);
                } else {
                    console.error("Unexpected response format:", response);
                    setFriendRequests([]); 
                }
            } catch (error) {
                console.error("Failed to get friends:", error);
                setFriendRequests([]);
            }
        };
    
        fetchFriends();
        fetchFriendReuest();
    }, [state.user?.token]); // 依賴 token，只有變更時才執行
    
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<Friend>>([]);
    const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());


    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log(searchQuery)
            if (searchQuery.trim() === "") {
                setSearchResults([]); 
                return;
            }
            const results = mockUsers.filter((user) =>
                user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
            );
            console.log(results)
            setSearchResults(results);
        }
    };

    const sendFriendRequest = (user: Friend) => {
        setSentRequests((prev) => new Set(prev).add(user.fullname));
        alert(`Friend request sent to ${user.fullname}!`);
    };

    return (
        <div className={styles.profileWrapper}>
            <h2 className={styles.profileTitle}>My Profile</h2>
            <hr className={styles.profileDivider} />

            <div className={styles.profileContainer}>
                {/* Left part: User Information */}
                <div className={styles.profileHeader}>
                    <img src={profilePic} alt="Profile" className={styles.profileImg} />
                    <h3>John Doe</h3>
                    <p className="text-muted">jdoe@ucsd.edu</p>

                    <p className="mb-5" style={{ color: "#e672d0", fontSize: "1.2rem", fontWeight: "bold" }}>
                        ##1 Friends
                    </p>

                    <button className="btn btn-primary">
                        <Link to="/admin-management" className="text-white text-decoration-none">
                            Admin Event Management
                        </Link>
                    </button>
                </div>

                {/* Right part: Friends & Requests */}
                <div className={styles.friendRequests}>
                    <div className="row mt-4">
                        {/* Friend List */}
                        <div className={`col-md-5 ${styles.friendsSection}`}>
                            <h4>Friends:</h4>
                            <div className={styles.friendsList}>
                                <ul className="list-unstyled">
                                    {(friends ?? []).map((friend) => (
                                        <li key={friend.fullname} className={styles.friendItem}>
                                            <img src={profilePic} alt="Friend" className={styles.friendImg} />
                                            {friend.fullname}
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
                                    {(friendRequests ?? []).map((friendRequests) => (
                                        <li className={`${styles.friendItem} d-flex align-items-center`}>
                                        <img key={friendRequests.fullname} src={profilePic} alt="Friend" className={styles.friendImg} />
                                        {friendRequests.fullname}
                                        <div className={styles.friendActions}>
                                            <button className="btn btn-success btn-sm">✔</button>
                                            <button className="btn btn-danger btn-sm">✖</button>
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
                                    <div key={user.fullname} className={`${styles.friendItem} d-flex align-items-center`}>
                                        <img src={profilePic} alt="User" className={styles.friendImg} />
                                        {user.fullname}
                                        <button
                                            className="btn btn-primary btn-sm ml-2"
                                            onClick={() => sendFriendRequest(user)}
                                            disabled={sentRequests.has(user.fullname)}
                                        >
                                            {sentRequests.has(user.fullname) ? "Request Sent" : "Send Request"}
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
