// Import the required modules
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toasts from './Toasts';
import axios from 'axios';

// Mock the axios module to simulate the API call
jest.mock('axios');

// Define some mock data for testing
const mockData = [
  { id: 1, username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, username: 'Antonette', email: 'Shanna@melissa.tv' },
  { id: 3, username: 'Samantha', email: 'Nathan@yesenia.net' },
];

// Write a test suite for the Toasts component
describe('Toasts component', () => {
  // Write a test case for rendering the component
  it('should render the component with a title and a button', () => {
    // Render the component
    render(<Toasts />);

    // Expect to find the title and the button on the screen
    expect(screen.getByText('hello crud')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  // Write a test case for fetching the data from the API
  it('should fetch the data from the API and display it in a table', async () => {
    // Mock the API response with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    // Render the component
    render(<Toasts />);

    // Expect to see a loading message while the data is being fetched
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      // Expect to find the table with the data on the screen
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(4); // 3 data rows + 1 header row
      expect(screen.getByText('Bret')).toBeInTheDocument();
      expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
      expect(screen.getByText('Antonette')).toBeInTheDocument();
      expect(screen.getByText('Shanna@melissa.tv')).toBeInTheDocument();
      expect(screen.getByText('Samantha')).toBeInTheDocument();
      expect(screen.getByText('Nathan@yesenia.net')).toBeInTheDocument();
    });
  });

  // Write a test case for adding a new row to the table
  it('should add a new row to the table when the add button is clicked', async () => {
    // Mock the API response with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    // Render the component
    render(<Toasts />);

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    // Click the add button to open the modal
    fireEvent.click(screen.getByText('Add'));

    // Expect to see the modal with the input fields and the submit button
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('id')).toBeInTheDocument();
    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();

    // Fill in the input fields with some values
    fireEvent.change(screen.getByLabelText('id'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('username'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('email'), {
      target: { value: 'alice@example.com' },
    });

    // Click the submit button to close the modal and add the new row
    fireEvent.click(screen.getByText('Submit'));

    // Expect to see the new row added to the table
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(5); // 4 data rows + 1 header row
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  // Write a test case for deleting a row from the table
  it('should delete a row from the table when the delete button is clicked', async () => {
    // Mock the API response with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    // Render the component
    render(<Toasts />);

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    // Click the delete button for the first row
    fireEvent.click(screen.getAllByText('DELETE')[0]);

    // Expect to see the first row removed from the table
    expect(screen.getAllByRole('row')).toHaveLength(3); // 2 data rows + 1 header row
    expect(screen.queryByText('Bret')).not.toBeInTheDocument();
    expect(screen.queryByText('Sincere@april.biz')).not.toBeInTheDocument();
  });

  // Write a test case for updating a row in the table
  it('should update a row in the table when the update button is clicked', async () => {
    // Mock the API response with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    // Render the component
    render(<Toasts />);

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    // Click the update button for the first row
    fireEvent.click(screen.getAllByText('UPDATE')[0]);

    // Expect to see the modal with the input fields and the edit button
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('id')).toBeInTheDocument();
    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();

    // Change the values of the input fields
    fireEvent.change(screen.getByLabelText('username'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('email'), {
      target: { value: 'bob@example.com' },
    });

    // Click the edit button to close the modal and update the row
    fireEvent.click(screen.getByText('Edit'));

    // Expect to see the row updated in the table
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });
});
