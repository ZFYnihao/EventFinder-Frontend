import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UpdateEventPage from './UpdateEventPage';
import { useInfo } from '../UserInfo';
import { updateEvent } from '../api/EventApi';


// mock the data
const mockEvent = {id:1, name:"Mock Event", desc:"This is a description of a mock event.",
  reglink:"", startdatetime: "2025-03-08T17:00", enddatetime:"2025-03-08T19:00",
   address:", , ", hostid: "fake@gmail.com"};

// Mock the modules
jest.mock('../UserInfo');
jest.mock('../api/EventApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  // mock window location so event data can be inputted into form
  useLocation: () => {return { state: { event: mockEvent } }},
}));

// Test the UpdateEventPage
describe('UpdateEvent', () => {
  // set the useInfo for page to use before each test
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
		<UpdateEventPage />
	  </BrowserRouter>
	);
  // check that correct labels for inputs are in the page
	await waitFor(() => {
	  expect(screen.getByText('Name:')).toBeInTheDocument();
	  expect(screen.getByText('Description:')).toBeInTheDocument();
	  expect(screen.getByText('Registration Link (Optional):')).toBeInTheDocument();
	  expect(screen.getByText('Start Date and Time:')).toBeInTheDocument();
	  expect(screen.getByText('End Date and Time:')).toBeInTheDocument();
	  expect(screen.getByText('Location (Optional):')).toBeInTheDocument();
	});
  });

  // makes sure all event data is in the form
  it('makes sure all event data is in the form', async () => {
    // render page
    render(
      <BrowserRouter>
        <UpdateEventPage />
      </BrowserRouter>
    );
    // check that all event data in input elements matches the that of the mock event
    expect((screen.getByPlaceholderText("Name") as HTMLInputElement).value == mockEvent.name);
    expect((screen.getByPlaceholderText("Description") as HTMLInputElement).value == mockEvent.desc);
    expect((screen.getByPlaceholderText("Link") as HTMLInputElement).value == mockEvent.reglink);
    expect((screen.getByTestId("start") as HTMLInputElement).value == mockEvent.startdatetime);
    expect((screen.getByTestId("end") as HTMLInputElement).value == mockEvent.enddatetime);
    expect((screen.getByPlaceholderText("Street") as HTMLInputElement).value == "123 Fake Street");
    expect((screen.getByPlaceholderText("City") as HTMLInputElement).value == "City");
    expect((screen.getByPlaceholderText("State") as HTMLInputElement).value == "State");
  });

  // makes sure that changing the data then updating it calls update with changed data if button clicked
  it('makes sure that changing the data then updating it calls update with changed data', async () => {
    window.confirm = jest.fn(() => true);
    // mock the function updateEvent
    (updateEvent as jest.Mock).mockResolvedValue({});
      // render page
      render(
        <BrowserRouter>
          <UpdateEventPage />
        </BrowserRouter>
      );
    // changed mock event
    const mockEvent2 = {id:1, name:"Mock Event 2", desc:"This is a description of a mock event - Changed",
      reglink:"", startdatetime: "2025-03-08T18:00", enddatetime:"2025-03-08T20:00",
       address:", , ", hostid: "fake@gmail.com"};

    // set the value of the input elements to the changed event data
    (screen.getByPlaceholderText("Name") as HTMLInputElement).value = mockEvent2.name;
    (screen.getByPlaceholderText("Description") as HTMLInputElement).value = mockEvent2.desc;
    (screen.getByPlaceholderText("Link") as HTMLInputElement).value = mockEvent2.reglink;
    (screen.getByTestId("start") as HTMLInputElement).value = mockEvent2.startdatetime;
    (screen.getByTestId("end") as HTMLInputElement).value = mockEvent2.enddatetime;
    (screen.getByPlaceholderText("Street") as HTMLInputElement).value = "";
    (screen.getByPlaceholderText("City") as HTMLInputElement).value = "";
    (screen.getByPlaceholderText("State") as HTMLInputElement).value = "";
  
      // click update event button
      await waitFor(() => {
        fireEvent.click(screen.getByTestId('update-event'));
      });
      // expect that the update event function is called with correct info
      expect(updateEvent).toHaveBeenCalledWith("mockToken", 1, mockEvent2);
    });

});
