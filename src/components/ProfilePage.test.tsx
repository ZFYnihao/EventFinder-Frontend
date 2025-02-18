import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";

describe("ProfilePage Component", () => {
    test("renders ProfilePage correctly", async () => {
        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );


        expect(screen.getByText("My Profile")).toBeInTheDocument();


        expect(screen.getByAltText("Profile")).toBeInTheDocument();


        expect(screen.getByText("Friends:")).toBeInTheDocument();
        expect(screen.getByText("Jane Doe 2")).toBeInTheDocument();

        expect(screen.getByText("Pending Requests:")).toBeInTheDocument();
        expect(screen.getByText("Jan Doe 5")).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /send friend requests/i })).toBeInTheDocument();
    });

    test("clicking the admin button navigates correctly", async () => {
        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        const adminButton = screen.getByRole("button", { name: /admin event management/i });
        fireEvent.click(adminButton);

        expect(window.location.pathname).toBe("/admin-management");
    });
});
