import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useInfo } from "../UserInfo";
import MainPage from "./HomePage";

jest.mock("../UserInfo", () => ({
  useInfo: jest.fn(),
}));

describe("MainPage Component", () => {
  test("renders login prompt when user is not logged in", () => {
    (useInfo as jest.Mock).mockReturnValue({ state: { isLogin: false } });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Welcome to the UCSD Event Finder!/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up now to see all events!/i)).toBeInTheDocument();
  });


  test("shows profile link when user is logged in", () => {
    (useInfo as jest.Mock).mockReturnValue({ state: { isLogin: true, user: { name: "Name" } } });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    
    expect(screen.getByRole("button", { name: /Go to Profile Page!/i })).toBeInTheDocument();
  });
});
