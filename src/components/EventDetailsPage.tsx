import { useLocation } from 'react-router-dom';
import React from "react";
import { AllEvent } from "../types/Event";
import { Friend } from "../types/Friend";
import profilePic from "../assets/ProfilePic.png";
import styles from "./EventDetailsPage.module.css";


	
const EventDetailsPage: React.FC = () => {
	const param = useLocation();
  	const { event } = param.state as { event: AllEvent };

	// check if the event exists, if not, display a statement saying this
	if (event == undefined) {
		return (
			<main>
      			<h1>This event does not exist. Please return to the 'All Events' page.</h1>
    		</main>
		);
	}
	// const friends: Array<Friend> = currentEvent.friends;
	const friends: Array<Friend> = [];
	// get event location or array with first string saying no location provided if no location
	const location = event.address?.length > 0
			? event.address.split(",")
			: ["No location provided", "", ""];
	// display event details if event with that id exists
	return (
	<main className="d-flex flex-column p-4" style={{ height: 'calc(100vh - 64px)' }}>
		{/* display title and host */}
		<div className={`${styles.titleDiv} row justify-content-center text-center`}>
			<h3>{event.name}</h3>
			<h5>Posted by {event.hostid}</h5>
		</div>
		<hr></hr>
		<div className={`${styles.titleDiv} row`}>
			{/* display description of event */}
			<div className={`${styles.descriptionDiv} col-md-9`}>
				<h5>Description</h5>
				<p>{event.desc}</p>
			</div>
			{/* display other info about event*/}
			<div className="col-md-3">
				<div className={`${styles.moreInfo} rounded`}>
					{/* display date and time */}
					<div className={`${styles.dateTimeDiv} row`}>
						<div className="col-md-2">
							<img src="../src/assets/time-icon.png" alt="Location Icon"></img>
						</div>
						<div className="col-md-10">
							<p>{event.startdatetime}<br></br>{event.enddatetime}</p>

						</div>
					</div>
					{/* display location */}
					<div className={`${styles.locationDiv} row`}>
						<div className="col-md-2">
							<img src="../src/assets/location-icon.png" alt="Location Icon"></img>
						</div>
						<div className="col-md-10">
							<p>{location[0]}<br></br>{location[1]}<br></br>{location[2]}</p>
						</div>
					</div>
					{/* display register button */}
					<div className={`${styles.registerButtonDiv} text-center`}>
						<button>Register for Event</button>
					</div>
				</div>

				{/* display friends attending*/}
				<div>
					<h6>Friends Attending</h6>
					<div className={styles.friendsList}>
						<ul className="list-unstyled">
							{friends.map((friend) => (
								<li key={friend.fullname} className={styles.friendItem}>
									<img src={profilePic} alt="Friend" className={styles.friendImg} />
										{friend.fullname}
								</li>
							))}
						</ul>
					</div>
				</div>

			</div>
		</div>
	</main>
	);
}

export default EventDetailsPage