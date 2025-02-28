export const mockEvents = [
  { 
      id: 1, name: "Sample Event 1",  
      desc: "This is a sample event for testing purposes.",
      regLink: "http://example.com/register",
      startDateTime: "2025-02-20 10:00:00", endDateTime: "2025-02-20 12:00:00", 
      address: "123 Sample St, Sample City, Country",
      hostId: 1 ,
      attendees: 5
  },
  { 
      id: 2, name: "Sample Event 2",  
      desc: "This event is for business networking and skill sharing.",
      regLink: "http://example.com/register2",
      startDateTime: "2025-02-21 14:00:00", endDateTime: "2025-02-21 16:00:00", 
      address: "456 Event St, Business City, Country",
      hostId: 2,
      attendees: 10
  },
  { 
      id: 3, name: "Sample Event 3",  
      desc: "Join us for a fun-filled evening of food and music.",
      regLink: "http://example.com/register3",
      startDateTime: "2025-02-2218:00:00", endDateTime: "2025-02-22 21:00:00", 
      address: "789 Fun Ave, Music City, Country",
      hostId: 3,
      attendees: 30
  },
  { 
      id: 4, name: "Sample Event 4",  
      desc: "A conference on technology and innovation.",
      regLink: "http://example.com/register4",
      startDateTime: "2025-02-23 09:00:00", endDateTime: "2025-02-23 17:00:00", 
      address: "101 Tech Park, Innovation City, Country",
      hostId: 4,
      attendees: 100
  },
  { 
      id: 5, name: "Sample Event 5: 02-24 to 02-27",  
      desc: "A marathon to promote health and fitness.",
      regLink: "http://example.com/register5",
      startDateTime: "2025-02-24 07:00:00", endDateTime: "2025-02-27 12:00:00", 
      address: "202 Fitness Rd, Sport City, Country",
      hostId: 5,
      attendees: 80
  },
  { 
      id: 6, name: "Sample Event 6: 02-24 to 03-02",  
      desc: "Art exhibition showcasing local artists.",
      regLink: "http://example.com/register6",
      startDateTime: "2025-02-24 15:00:00", endDateTime: "2025-03-02 19:00:00", 
      address: "303 Art Gallery, Creative City, Country",
      hostId: 6,
      attendees: 111
  },
  { 
      id: 7, name: "Sample Event 7: 02-12 to 02-28",
      desc: "Workshop on digital marketing strategies.",
      regLink: "http://example.com/register7",
      startDateTime: "2025-02-12 11:00:00", endDateTime: "2025-02-28 13:00:00", 
      address: "404 Marketing Blvd, Business City, Country",
      hostId: 7,
      attendees: 82
  },
  { 
      id: 8, name: "Sample Event 8", 
      desc: "Music festival with international performers.",
      regLink: "http://example.com/register8",
      startDateTime: "2025-02-27 12:00:00", endDateTime: "2025-02-27 22:00:00", 
      address: "505 Festival Park, Music City, Country",
      hostId: 8,
      attendees: 120
  },
  { 
      id: 9, name: "Sample Event 9", 
      desc: "Cooking class for beginners in the kitchen.",
      regLink: "http://example.com/register9",
      startDateTime: "2025-02-28 14:00:00", endDateTime: "2025-02-28 17:00:00", 
      address: "606 Culinary St, Food City, Country",
      hostId: 9,
      attendees: 99
  },
  { 
      id: 10, name: "Sample Event 10", 
      desc: "Yoga and wellness retreat for relaxation.",
      regLink: "http://example.com/register10",
      startDateTime: "2025-03-01 08:00:00", endDateTime: "2025-03-01 11:00:00", 
      address: "707 Wellness Way, Health City, Country",
      hostId: 10,
      attendees: 6
  },
  { 
      id: 11, name: "Sample Event 11",  
      desc: "Food tasting event showcasing local cuisine.",
      regLink: "http://example.com/register11",
      startDateTime: "2025-03-02 16:00:00", endDateTime: "2025-03-02 19:00:00", 
      address: "808 Taste Blvd, Food City, Country",
      hostId: 11,
      attendees: 93
  },
  { 
      id: 12, name: "Sample Event 12",  
      desc: "Charity auction for local community projects.",
      regLink: "http://example.com/register12",
      startDateTime: "2025-03-03 18:00:00", endDateTime: "2025-03-03 21:00:00", 
      address: "909 Charity St, Giving City, Country",
      hostId: 12,
      attendees: 32
  },
  { 
      id: 13, name: "Sample Event 13",  
      desc: "Tech startup competition for aspiring entrepreneurs.",
      regLink: "http://example.com/register13",
      startDateTime: "2025-03-04 10:00:00", endDateTime: "2025-03-04 16:00:00", 
      address: "1010 Startup Park, Innovation City, Country",
      hostId: 13,
      attendees: 44
  },
  { 
      id: 14, name: "Sample Event 14", 
      desc: "Photography exhibition by renowned artists.",
      regLink: "http://example.com/register14",
      startDateTime: "2025-03-05 17:00:00", endDateTime: "2025-03-05 20:00:00", 
      address: "1111 Photography Lane, Creative City, Country",
      hostId: 14,
      attendees: 39
  },
  { 
      id: 15, name: "Sample Event 15",  
      desc: "Career fair for recent graduates and job seekers.",
      regLink: "http://example.com/register15",
      startDateTime: "2025-03-06 09:00:00", endDateTime: "2025-03-06 13:00:00", 
      address: "1212 Career Blvd, Job City, Country",
      hostId: 15,
      attendees: 93
  }
];

export interface Friend {
  name: string;
  email: string;
}

export const friends: Friend[] = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Michael Brown", email: "michael.brown@example.com" },
  { name: "Emily White", email: "emily.white@example.com" },
  { name: "Chris Green", email: "chris.green@example.com" },
  { name: "Anna Black", email: "anna.black@example.com" },
  { name: "David Blue", email: "david.blue@example.com" },
  { name: "Sophie Adams", email: "sophie.adams@example.com" },
  { name: "James Taylor", email: "james.taylor@example.com" },
  { name: "Olivia Johnson", email: "olivia.johnson@example.com" },
  { name: "Daniel Lee", email: "daniel.lee@example.com" },
  { name: "Grace King", email: "grace.king@example.com" },
  { name: "Matthew Scott", email: "matthew.scott@example.com" },
  { name: "Hannah Moore", email: "hannah.moore@example.com" },
  { name: "William Clark", email: "william.clark@example.com" }
];
