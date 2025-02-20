import React from "react";

import styles from "./ProfilePage.module.css";

import profilePic from "../assets/ProfilePic.png";

import { Link } from "react-router-dom";

import { useInfo } from "../UserInfo";
import { Friend } from "../types/Friend"
import { mockFriends } from "../MockData"

const ProfilePage: React.FC = () => {
    const { state } = useInfo();
    console.log(state);
    const friends : Array<Friend> = mockFriends

    return (
        <div className={styles.profileWrapper}>
                <h2 className={styles.profileTitle}>My Profile</h2>
                <hr className={styles.profileDivider} />
                
                <div className={styles.profileContainer}>

                
                {/* Left part:information*/}
                <div className={styles.profileHeader}>
                    <img src={profilePic} alt="Profile" className={styles.profileImg} />
                    <h3>John Doe</h3>
                    <p className="text-muted">jdoe@ucsd.edu</p>

                    <p className="mb-5" style={{ color:"#e672d0", fontSize: "1.2rem", fontWeight: "bold" }}>
                        ##1 Friends
                    </p>

                    <button className="btn btn-primary">
                        <Link to="/admin-management" className="text-white text-decoration-none">Admin Event Management</Link>
                    </button>
                </div>


                {/* right part:friend and friend request */}
                <div className={styles.friendRequests}>
                    <div className="row mt-4">


                        {/* friend list */}
                        <div className={`col-md-5 ${styles.friendsSection}`}>
                            <h4>Friends:</h4>
                            <div className={styles.friendsList}>
                                <ul className="list-unstyled">
                                    {friends.map((friend) => (
                                        <li className={styles.friendItem}>
                                            <img src={profilePic} alt="Friend" className={styles.friendImg} />
                                            {friend.name}
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

                                    <li className={`${styles.friendItem} d-flex align-items-center`}>
                                        <img src={profilePic} alt="Friend" className={styles.friendImg} />
                                        Jan Doe 5
                                        <div className={styles.friendActions}>
                                            <button className="btn btn-success btn-sm">✔</button>
                                            <button className="btn btn-danger btn-sm">✖</button>
                                        </div>
                                    </li>
                                    <li className={`${styles.friendItem} d-flex align-items-center`}>
                                        <img src={profilePic} alt="Friend" className={styles.friendImg} />
                                        Jan Doe 6
                                        <div className={styles.friendActions}>
                                            <button className="btn btn-success btn-sm">✔</button>
                                            <button className="btn btn-danger btn-sm">✖</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>


                    {/* send request */}
                    <div className={`text-center mt-3 ${styles.sendRequestContainer}`}>
                        <button className="btn btn-secondary">Send Friend Requests...</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;