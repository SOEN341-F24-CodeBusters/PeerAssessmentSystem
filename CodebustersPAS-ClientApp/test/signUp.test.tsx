import { describe, it, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CreateAccount from "../src/pages/CreateAccountPage";
import '@testing-library/jest-dom';
import {
    BrowserRouter as Router  } from "react-router-dom";

test('submitting the form calls handleSignUp', async () => {
  render(
    <Router>
      <CreateAccount />
    </Router>
  );

  // Fill out the form fields
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Sign Up/i));

  // Wait for potential API call and assert if the redirection occurs
  await waitFor(() => expect(window.location.pathname).toBe('/'));
});

test('selecting user type changes state', () => {
  render(
    <Router>
      <CreateAccount />
    </Router>
  );

  // Select 'Instructor' radio button
  fireEvent.click(screen.getByLabelText(/Instructor/i) as HTMLInputElement);

  // Assert that the 'Instructor' radio button is checked and 'Student' is unchecked
  const instructorRadioButton = screen.getByLabelText(/Instructor/i) as HTMLInputElement;
  const studentRadioButton = screen.getByLabelText(/Student/i) as HTMLInputElement;

  expect(instructorRadioButton.checked).toBe(true);
  expect(studentRadioButton.checked).toBe(false);
});

test('selecting user type shows instructor field is not shown', () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );
  
    // First, ensure the "Instructor" radio button is selected
    const instructorRadioButton = screen.getByLabelText(/Instructor/i) as HTMLInputElement;
    fireEvent.click(instructorRadioButton);
  
    // Check that the "Student ID" field is not rendered for the instructor
    const studentIDInput = screen.queryByLabelText(/Student ID/i);
  
    // Assert that the student ID input field is not rendered for instructor
    expect(studentIDInput).not.toBeInTheDocument();
  });

test('clicking Sign In link navigates to Sign In page', () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );
  
    // Find the Sign In link and click it
    fireEvent.click(screen.getByText(/Sign In/i));
  
    // Assert that the navigation happened correctly
    expect(window.location.pathname).toBe('/');
  });

  test('password field should have type password', () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );
  
    // Check that the password field is of type "password"
    const passwordField = screen.getByLabelText(/Password/i);
    expect(passwordField).toHaveAttribute('type', 'password');
  });
  
  