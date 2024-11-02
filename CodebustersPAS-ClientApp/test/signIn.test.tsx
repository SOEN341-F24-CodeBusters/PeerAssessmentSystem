import { describe, it, expect, test } from 'vitest';
import { render, screen } from "@testing-library/react";
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import SignIn from "../src/pages/LoginPage";


test("Demo", {}, () => {
    expect(1).toBe(1);
});


describe("Sign In Page", {}, () => {
    it("should render the sign in page", () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        expect(screen.getByText("Sign In", { selector: 'h2' }));
        expect(screen.getByRole('button', { name: 'Sign In' }));
    });
});
