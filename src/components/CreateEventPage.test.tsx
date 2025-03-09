import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateEventPage from './CreateEventPage';
import { useInfo } from '../UserInfo';
import { createEvent } from '../api/EventApi';

// Mock the modules
jest.mock('../UserInfo');
jest.mock('../api/EventApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// testing CreateEventPage
describe('CreateEvent', () => {
  beforeEach(() => {
	(useInfo as jest.Mock).mockReturnValue({
	  state: { user: { token: 'mockToken', is_admin: true, email: "fake@gmail.com" } },
	});
  });

  // makes sure the proper text is rendered
  it('renders the create event page with proper text', async () => {
	// render page
	render(
	  <BrowserRouter>
		<CreateEventPage />
	  </BrowserRouter>
	);
	// expect labels for input elements to be correct
	await waitFor(() => {
	  expect(screen.getByText('Name:')).toBeInTheDocument();
	  expect(screen.getByText('Description:')).toBeInTheDocument();
	  expect(screen.getByText('Registration Link (Optional):')).toBeInTheDocument();
	  expect(screen.getByText('Start Date and Time:')).toBeInTheDocument();
	  expect(screen.getByText('End Date and Time:')).toBeInTheDocument();
	  expect(screen.getByText('Location (Optional):')).toBeInTheDocument();
	});
  });

  // makes sure an empty event can't be created
  it('does not allow creation of empty event', async () => {
	// render page
    render(
      <BrowserRouter>
        <CreateEventPage />
      </BrowserRouter>
    );
	// click the create event button
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("create-event"));
    });
	// set window.alert to mock function
	window.alert = jest.fn();
	// expect an alert - empty event shouldn't be created
    expect(window.alert);
  });

  // test creation of event with all fields filled out
  it('allows the creation of a valid event with all fields filled out', async () => {
	window.confirm = jest.fn(() => true);
	// mock the create event function
    (createEvent as jest.Mock).mockResolvedValue({});
	// render page
    render(
      <BrowserRouter>
        <CreateEventPage />
      </BrowserRouter>
    );

	// mock event data
	const mockEvent = {id:null, name:"Mock Event", desc:"This is a description of a mock event.",
		reglink:"https://ucsd.edu/", startdatetime: "2025-03-08T17:00", enddatetime:"2025-03-08T19:00",
		 address:"123 Fake Street, City, State", hostId: "fake@gmail.com"};
	// set the inputs to the mock data
	(screen.getByPlaceholderText("Name") as HTMLInputElement).value = mockEvent.name;
	(screen.getByPlaceholderText("Description") as HTMLInputElement).value = mockEvent.desc;
	(screen.getByPlaceholderText("Link") as HTMLInputElement).value = mockEvent.reglink;
	(screen.getByTestId("start") as HTMLInputElement).value = mockEvent.startdatetime;
	(screen.getByTestId("end") as HTMLInputElement).value = mockEvent.enddatetime;
	(screen.getByPlaceholderText("Street") as HTMLInputElement).value = "123 Fake Street";
	(screen.getByPlaceholderText("City") as HTMLInputElement).value = "City";
	(screen.getByPlaceholderText("State") as HTMLInputElement).value = "State";


	// 'click' the create event button
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('create-event'));
    });
	// expect that the create event function should be called with correct data
    expect(createEvent).toHaveBeenCalledWith("mockToken", mockEvent);
  });

  // test creation of event with empty location and reglink values
  it('allows the creation of a valid event with empty location and registration link', async () => {
	window.confirm = jest.fn(() => true);
	// mock create event function
    (createEvent as jest.Mock).mockResolvedValue({});
	// render page
    render(
      <BrowserRouter>
        <CreateEventPage />
      </BrowserRouter>
    );
	// mock event data - empty location and reglink
	const mockEvent = {id:null, name:"Mock Event", desc:"This is a description of a mock event.",
		reglink:"", startdatetime: "2025-03-08T17:00", enddatetime:"2025-03-08T19:00",
		 address:", , ", hostId: "fake@gmail.com"};
	(screen.getByPlaceholderText("Name") as HTMLInputElement).value = mockEvent.name;
	(screen.getByPlaceholderText("Description") as HTMLInputElement).value = mockEvent.desc;
	(screen.getByPlaceholderText("Link") as HTMLInputElement).value = mockEvent.reglink;
	(screen.getByTestId("start") as HTMLInputElement).value = mockEvent.startdatetime;
	(screen.getByTestId("end") as HTMLInputElement).value = mockEvent.enddatetime;
	(screen.getByPlaceholderText("Street") as HTMLInputElement).value = "";
	(screen.getByPlaceholderText("City") as HTMLInputElement).value = "";
	(screen.getByPlaceholderText("State") as HTMLInputElement).value = "";

	// 'click' the create event button
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('create-event'));
    });
	// expect the create event function to be called with correct input
    expect(createEvent).toHaveBeenCalledWith("mockToken", mockEvent);
  });
  

});
