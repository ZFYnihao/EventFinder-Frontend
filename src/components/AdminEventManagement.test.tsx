import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventManagement from './AdminEventManagement';
import { useInfo } from '../UserInfo';
import { getAdminEvent, deleteEvent, getAdminEventAttendees } from '../api/EventApi';

// Mock the modules
jest.mock('../UserInfo');
jest.mock('../api/EventApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockEvents = [
  { id: 1, name: 'Event 1', startdatetime: '2025-03-15T10:00:00Z' },
  { id: 2, name: 'Event 2', startdatetime: '2025-03-20T14:00:00Z' },
];

describe('EventManagement', () => {
  beforeEach(() => {
    (useInfo as jest.Mock).mockReturnValue({
      state: { user: { token: 'mockToken', is_admin: true } },
    });
    getAdminEvent.mockResolvedValue({ events: mockEvents });
  });

  it('renders the component and fetches events', async () => {
    render(
      <BrowserRouter>
        <EventManagement />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Admin Event Management')).toBeInTheDocument();
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });
  });

  it('shows access denied message for non-admin users', () => {
    useInfo.mockReturnValue({
      state: { user: { is_admin: false } },
    });

    render(
      <BrowserRouter>
        <EventManagement />
      </BrowserRouter>
    );

    expect(screen.getByText('Access Denied. You do not have permission to access this page.')).toBeInTheDocument();
  });

  it('handles event deletion', async () => {
    window.confirm = jest.fn(() => true);
    deleteEvent.mockResolvedValue({});

    render(
      <BrowserRouter>
        <EventManagement />
      </BrowserRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('delete-event-1'));
    });

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete the event "Event 1"?');
    expect(deleteEvent).toHaveBeenCalledWith('mockToken', 1);
  });

  it('handles CSV download', async () => {
    const mockBlob = new Blob(['mock,csv,data'], { type: 'text/csv' });
    getAdminEventAttendees.mockResolvedValue(mockBlob);

    render(
      <BrowserRouter>
        <EventManagement />
      </BrowserRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('download-event-1'));
    });

    expect(getAdminEventAttendees).toHaveBeenCalledWith('mockToken', 1);
  });

  it('navigates to create event page', () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <EventManagement />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Create Event'));
    expect(navigateMock).toHaveBeenCalledWith('/create-event');
  });

  it('formats date correctly', async () => {
    render(
      <BrowserRouter>
        <EventManagement />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('03/15/2025')).toBeInTheDocument();
      expect(screen.getByText('03/20/2025')).toBeInTheDocument();
    });
  });
});
