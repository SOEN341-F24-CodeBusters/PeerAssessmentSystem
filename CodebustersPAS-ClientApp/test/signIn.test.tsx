import { describe, it, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from "../src/pages/LoginPage";

describe("Sign In Page", {}, () => {
    it("should render the sign in page", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        expect(screen.getByText("Sign In", { selector: 'h2' }));
        expect(screen.getByRole('button', { name: 'Sign In' }));
    });

test('renders email and password input fields', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
});

test('can toggle between student and instructor user types', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const studentRadio = screen.getByLabelText(/student/i);
    const instructorRadio = screen.getByLabelText(/instructor/i);

    expect(studentRadio).toBeChecked();
    
    fireEvent.click(instructorRadio);
    expect(instructorRadio).toBeChecked();
    expect(studentRadio).not.toBeChecked();

    fireEvent.click(studentRadio);
    expect(studentRadio).toBeChecked();
    expect(instructorRadio).not.toBeChecked();
});

});

