import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { useInfo } from '../UserInfo';
import { getFriends, getFriendsRequest, sendFriendsRequest, acceptFriendsRequest, declineFriendsRequest, deleteFriend } from '../api/FriendApi';
import { getUsers } from '../api/UserApi';

// Mock dependencies
jest.mock('../UserInfo', () => ({
  useInfo: jest.fn()
}));

jest.mock('../api/FriendApi', () => ({
  getFriends: jest.fn(),
  getFriendsRequest: jest.fn(),
  sendFriendsRequest: jest.fn(),
  acceptFriendsRequest: jest.fn(),
  declineFriendsRequest: jest.fn(),
  deleteFriend: jest.fn()
}));

jest.mock('../api/UserApi', () => ({
  getUsers: jest.fn()
}));

describe('ProfilePage', () => {
  const mockState = {
    isLogin: true,
    user: {
      token: 'mock-token',
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      picture: ''
    }
  };

  beforeEach(() => {
    (useInfo as jest.Mock).mockReturnValue({ state: mockState });
  });


  it('shows access denied when not logged in', async () => {
    const loggedOutState = { isLogin: false, user: null };
    (useInfo as jest.Mock).mockReturnValue({ state: loggedOutState });
    
    render(<ProfilePage />);

    expect(screen.getByText(/Access Denied. Please log in to view this page./)).toBeInTheDocument();
    expect(screen.queryByText(/My Profile/)).not.toBeInTheDocument();
  });

  it('fetches friends and friend requests on mount', async () => {
    (getFriends as jest.Mock).mockResolvedValue({ friends: [{ id: 1, fullname: 'Friend 1', email: 'friend1@example.com' }] });
    (getFriendsRequest as jest.Mock).mockResolvedValue({ friendRequests: [{ id: 2, fullname: 'Friend Request 1', email: 'friendrequest1@example.com' }] });
    
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText(/Friend 1/)).toBeInTheDocument();
      expect(screen.getByText(/Friend Request 1/)).toBeInTheDocument();
    });
  });

  it('searches for users and displays results', async () => {
    (getUsers as jest.Mock).mockResolvedValue([{ id: 3, fullname: 'User 3', email: 'user3@example.com' }]);
    
    render(<ProfilePage />);
    
    const searchInput = screen.getByPlaceholderText('Search for users...');
    fireEvent.change(searchInput, { target: { value: 'User 3' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/User 3/)).toBeInTheDocument();
    });
  });

  it('sends a friend request when clicked', async () => {
    // Mocking the API response
    (sendFriendsRequest as jest.Mock).mockResolvedValue({ message: 'Friend request sent' });
    (getUsers as jest.Mock).mockResolvedValue([{ id: 3, fullname: 'User 3', email: 'user3@example.com' }]);
    
    render(<ProfilePage />);
  
    const searchInput = screen.getByPlaceholderText('Search for users...');
    fireEvent.change(searchInput, { target: { value: 'User 3' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
  
    // Wait for search results to appear
    await waitFor(() => {
      expect(screen.getByText(/User 3/)).toBeInTheDocument();
    });
  
    // Find the send request button
    const sendRequestButton = screen.getByText(/Send Request/);
    
    // Ensure the button is not disabled and then click it
    expect(sendRequestButton).not.toBeDisabled();
    
    // Click the button to send the friend request
    fireEvent.click(sendRequestButton);
  
    // Wait for the state update and the button text to change
    await waitFor(() => {
      // Check that the button text is updated to "Request Sent"
      const updatedButton = screen.getByText(/Request Sent/);
      expect(updatedButton).toBeInTheDocument();
    });
  
    // Optionally, log out the DOM to debug
    screen.debug();
  });
  
  it('accepts a friend request', async () => {
    (acceptFriendsRequest as jest.Mock).mockResolvedValue({ message: 'Friend request accepted' });

    render(<ProfilePage />);

    await waitFor(() => {
      const acceptButton = screen.getByText('✔');
      fireEvent.click(acceptButton);

      expect(acceptFriendsRequest).toHaveBeenCalledWith('mock-token', 2); // assuming the friend ID is 2
    });
  });

  it('declines a friend request', async () => {
    (declineFriendsRequest as jest.Mock).mockResolvedValue({ message: 'Friend request declined' });

    render(<ProfilePage />);

    await waitFor(() => {
      const declineButton = screen.getByText('✖');
      fireEvent.click(declineButton);

      expect(declineFriendsRequest).toHaveBeenCalledWith('mock-token', 2); // assuming the friend ID is 2
    });
  });

  it('removes a friend', async () => {
    (deleteFriend as jest.Mock).mockResolvedValue({ message: 'Friend removed' });
    
    render(<ProfilePage />);

    await waitFor(() => {
      const removeButton = screen.getByText('-');
      fireEvent.click(removeButton);

      expect(deleteFriend).toHaveBeenCalledWith('mock-token', 1); // assuming friend ID is 1
    });
  });
});
