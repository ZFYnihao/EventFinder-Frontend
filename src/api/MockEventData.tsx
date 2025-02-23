export const mockEvents = [
    { id: 1, name: "CSE Lunch Event", host: "CSE", 
      description: "Come eat lunch with CSE professors and learn about their expertise. "
      + "Admission is free for all UCSD students, and food from various delicious places will "
      + "be provided at this event. Come for a fun time!!",
      date: "01/28/2025", time: "12:00 PM to 1:00 PM", location: ["UC San Diego", "9500 Gilman Dr.", 
      "La Jolla, CA 92093"],
      friends: [{name: "Percy Jackson", email:"pj@pj.com"}, {name: "Bob Bobson", email:"b@b.com"},
      {name: "Terra Earth", email:"e@e.com"}, {name: "Callum Hunt", email:"c@h.com"}, 
      {name: "Terra Earth", email:"e@e.com"}, {name: "Callum Hunt", email:"c@h.com"}],
      attendees: 100 },

    { id: 2, name: "ECE group talk", host: "ece", description: "a group talk", 
      date: "02/24/2025", time: "X:XX XM to X:XX XM", location: ["UC San Diego", "9500 Gilman Dr.", 
        "La Jolla, CA 92093"],
       friends: [], attendees: 60 },

    { id: 3, name: "CSE 210 discussion 1", host: "cse", description: "discussion", 
      date: "02/21/2025", time: "X:XX XM to X:XX XM", location: ["UC San Diego", "9500 Gilman Dr.", 
        "La Jolla, CA 92093"],
      friends: [{name: "Quinn Tyler", email:"q@q.com"}, {name: "Peter Parker", email:"p@p.com"}], attendees: 7 },

    { id: 4, name: "CSE 210 discussion 2", host: "cse", description: "discussion", 
      date: "02/22/2025", time: "X:XX XM to X:XX XM", location: ["UC San Diego", "9500 Gilman Dr.", 
        "La Jolla, CA 92093"],
      friends: [{name: "Bobby West", email:"b@w.com"}], attendees: 8 },

    { id: 5, name: "CSE 210 discussion 3", host: "cse", description: "discussion", 
      date: "02/23/2025", time: "X:XX XM to X:XX XM", location: ["UC San Diego", "9500 Gilman Dr.", 
        "La Jolla, CA 92093"],
      friends: [{name: "Michael Weston", email:"m@w.com"}], attendees: 9 },

    { id: 6, name: "CSE 210 discussion 4", host: "cse", description: "discussion", 
      date: "02/24/2025", time: "X:XX XM to X:XX XM", location: [],
      friends: [{name: "Michael Weston", email:"m@w.com"},{name: "Toph Beifong", email:"t@b.com"}], attendees: 10 },
    { id: 7, name: "CSE 210 discussion 5", host: "cse", description: "discussion", 
      date: "02/25/2025", time: "X:XX XM to X:XX XM", location: [],
      friends: [], attendees: 11 },
    
    { id: 8, name: "CSE 210 discussion 6", host: "cse", description: "discussion", 
      date: "02/26/2025", time: "X:XX XM to X:XX XM", location: [],
      friends: [{name: "Ms. Frizzle", email:"m@f.com"}], attendees: 12 },

  ];

  export interface Friend {
    name: string;
    email: string;
}