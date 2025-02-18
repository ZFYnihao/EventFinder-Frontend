import { render, screen } from '@testing-library/react';
import App from './App';
import TopPage from './components/TopPage';
import HomePage from './components/HomePage';

// Mock the components if needed
jest.mock('./components/TopPage', () => () => <div>Top Page</div>);
jest.mock('./components/HomePage', () => () => <div>Home Page</div>);

describe('App', () => {
  it('renders the TopPage component', () => {
    render(<App />);
    const topPageElement = screen.getByText(/Top Page/i); // Expecting the mock component text
    expect(topPageElement).toBeInTheDocument();
  });

  it('renders the HomePage component', () => {
    render(<App />);
    const homePageElement = screen.getByText(/Home Page/i); // Expecting the mock component text
    expect(homePageElement).toBeInTheDocument();
  });
});
