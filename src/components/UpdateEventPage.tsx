import { useParams } from "react-router-dom";
import styles from "./CreateUpdateEventPage.module.css";
import "./CreateUpdateEventPage.module.css";
import React, { useEffect, useState } from "react";
import { mockEvents } from "../api/MockEventData";
import { EventDataInterface } from "../types/EventData";

const UpdateEventPage: React.FC = () => {
	const { id } = useParams();
	const [events, setEvents] = useState<EventDataInterface[]>([]);
	useEffect(() => {
			setEvents(mockEvents);
	}, []);
	// convert id to number if it is a number
	const eventID = id ? parseInt(id, 10) : NaN;
	const currentEvent = events.find(event => event.id == eventID);
	
	// check if the event exists, if not, display a statement saying this
	if (currentEvent == undefined) {
		return (
			<main>
      			<h1>This event does not exist or you do not have permission to edit this event. Please return to the 'All Events' page.</h1>
    		</main>
		);
	}
	// split address into three component parts
	const currentAddress = (currentEvent.address as string).split(", ")

	

	// updates the event and returns to event management page if the inputs are all valid (calls validateEvent)
	// CURRENTLY NOT CONNECTED TO BACKEND, ONLY SENDS AN ALERT WITH EVENT INFO
	function updateEvent() {
		// get input elements
		const name = (document.getElementById("name") as HTMLInputElement)
		const desc = (document.getElementById("desc") as HTMLTextAreaElement)
		const reglink = (document.getElementById("reglink") as HTMLInputElement)
		const startdatetime = (document.getElementById("startdatetime") as HTMLInputElement)
		const enddatetime = (document.getElementById("enddatetime") as HTMLInputElement)
		const street = (document.getElementById("street") as HTMLInputElement)
		const city = (document.getElementById("city") as HTMLInputElement)
		const state = (document.getElementById("state") as HTMLInputElement)
		// create address from street, city, state values
		const address = `${street.value}, ${city.value}, ${state.value}`
		// creates a const of event data to display in alert
		// FOR TESTING, MAYBE NOT NEEDED AFTER CONNECTED TO BACKEND
		const changedEvent = {
			name: name.value,
			desc: desc.value,
			reglink: reglink.value,
			startdatetime: startdatetime.value,
			enddatetime: enddatetime.value,
			address: address
		};
		// send an alert saying the event is updated
		// ADD EVENT TO DATABASE LATER
		if (validateEvent(name, desc, reglink, startdatetime, enddatetime, street, city, state)) {
			alert(`Event Named ${name.value} Updated`)
			alert(JSON.stringify(changedEvent))
			window.location.href = "/admin";
		}
	}

	// check inputs to see if valid for an event
	function validateEvent(name:HTMLInputElement, desc:HTMLTextAreaElement, reglink:HTMLInputElement,
		 startdatetime:HTMLInputElement, enddatetime:HTMLInputElement, street:HTMLInputElement,
		  city:HTMLInputElement, state:HTMLInputElement):Boolean {
		// make sure event name is not too short
		if (name.value.length < name.minLength) {
			alert(`Event Name must be at least ${name.minLength} characters!!`)
			return false
		}
		// make sure event description is not too short
		if (desc.value.length < desc.minLength) {
			alert(`Event Description must be at least ${desc.minLength} characters!!`)
			return false
		}
		// make sure reglink is empty or a valid url
		if (!(reglink.value=="")) {
			try {
				new URL(reglink.value);
			  } catch (_) {
				alert("Registration Link must be a url (be of the form urlscheme://rest-of-url, e.g. https://www.example.com) or empty!!")
				return false;  
			}
		}
		// make sure startdatetime is not empty
		if (startdatetime.value == "") {
			alert("Enter a valid start date!!")
			return false
		}
		// make sure enddatetime is not empty
		if (enddatetime.value == "") {
			alert("Enter a valid end date!!")
			return false
		}
		// make sure enddatetime is not the same as or before startdatetime
		if (enddatetime.value <= startdatetime.value) {
			alert("End date/time must be after start date/time!!")
			return false
		}
		// make sure location is filled out or completely empty
		if ((street.value=="" || city.value=="" || state.value=="") &&
			!(street.value=="" && city.value=="" && state.value=="")) {
			alert("You must fill out all fields of location or none of them!!")
			return false
		}

		return true
	}
	
	return (
		<main className={`${styles.createEvent}`}>
			{/* Title of page */}
			<div className="row">
				<h1>Update Event</h1>
			</div>

			{/* Form to Create Event */}
			<div className={`${styles.createEventForm}`} id="createEventForm">
				{/* Event name Input */}
				<div className="row">
					<div className="col-md-4">
						<h3>Name:</h3>
					</div>
					<div className="col-md-8">
					<input type="text" id="name" name="name" defaultValue={currentEvent.name} placeholder="Name" minLength={4}/>
					</div>
				</div>
				{/* Description Input */}
				<div className="row">
					<div className="col-md-4">
						<h3>Description:</h3>
					</div>
					<div className="col-md-8">
						<textarea className={`${styles.desc}`} id="desc" name="desc" defaultValue={currentEvent.desc} placeholder="Description" minLength={25} cols={90}></textarea>
					</div>
				</div>
				{/* Registration Link Input */}
				<div className="row">
					<div className="col-md-4">
						<h3>Registration Link (Optional):</h3>
					</div>
					<div className="col-md-8">
						<input type="url" id="reglink" name="reglink" defaultValue={currentEvent.regLink} placeholder="Link"/>
					</div>
				</div>
				{/* Start Date Time Input */}
				<div className="row">
					<div className="col-md-4">
						<h3>Start Date and Time:</h3>
					</div>
					<div className="col-md-8">
						<input type="datetime-local" id="startdatetime" name="startdatetime" defaultValue={currentEvent.startDateTime} min={(new Date()).toISOString().substring(0,16)}/>
					</div>
				</div>
				{/* End Date Time nput */}
				<div className="row">
					<div className="col-md-4">
						<h3>End Date and Time:</h3>
					</div>
					<div className="col-md-8">
						<input type="datetime-local" id="enddatetime" name="enddatetime" defaultValue={currentEvent.endDateTime} min={(new Date()).toISOString().substring(0,16)}/>
					</div>
				</div>
				{/* Location (Street, City, State) Input */}
				<div className="row">
					<div className="col-md-4">
						<h3>Location (Optional):</h3>
					</div>
					<div className="col-md-8">
						<div className="row">
							<div className="col-md-6">
								<input type="text" id="street" placeholder="Street" defaultValue={currentAddress[0]}/>
							</div>
							<div className="col-md-3">
								<input type="text" id="city" placeholder="City" defaultValue={currentAddress[1]}/>
							</div>
							<div className="col-md-3">
								<input type="text" id="state" placeholder="State" defaultValue={currentAddress[2]}/>
							</div>
						</div>
					</div>
				</div>
				{/* Update Event Button */}
				<div className={`${styles.buttonDiv} row`}>
					<button className="rounded" id="update" onClick={updateEvent}>Update Event</button>
				</div>
			</div>
		</main>
	);
}

export default UpdateEventPage