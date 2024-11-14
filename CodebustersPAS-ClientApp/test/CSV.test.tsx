import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CSVUpload from '../src/pages/Teacher/CreateTeam/CSVUpload'; 
import { describe, it, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';

describe('CSVUpload Component', () => {
  
    // Basic rendering Test

    it('should render correctly', () => {
    render(<CSVUpload />);
    
    expect(screen.getByText('Upload Teams CSV File')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Group Name')).toBeInTheDocument();
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

    // Test error message display when Group name missing  

    it('should display an error message when group name is missing', () => {
    render(<CSVUpload />);

    fireEvent.click(screen.getByText('Upload CSV'));
    expect(screen.getByText('Please enter a group name.')).toBeInTheDocument();
  });

});