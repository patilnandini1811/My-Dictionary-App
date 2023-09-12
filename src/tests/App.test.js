
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

// Test case:1 fetching data
test('renders My Dictionary App', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ word: "test", phonetics: [{ audio: "audio_url" }], meanings: [{ definitions: [{ definition: "This is a test definition" }] }] }])
    })
  );

  render(<App />);
  
  const titleElement = screen.getByText(/My Dictionary App/i);
  expect(titleElement).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText('Search for a word..');
  fireEvent.change(searchInput, { target: { value: 'test' } });

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  await waitFor(() => {  
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

// Test case:2 search field is empty
test('shows an error when the search field is empty', async () => {
  render(<App />);

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  await waitFor(() => {
    const errorMsg = screen.getByText('Search field is empty.');
    expect(errorMsg).toBeInTheDocument();
  });
});

// Test case:3 single letter is entered
test('shows an error when the search only contains a single letter', async () => {
  render(<App />);

  
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  fireEvent.change(searchInput, { target: { value: 'a' } });

  //  search button
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  await waitFor(() => {
    const errorSingleLetter = screen.getByText('Please enter a whole word!');
    expect(errorSingleLetter).toBeInTheDocument();
  });
});
//Test case:4
test('shows "No Definitions Found" when the word has no definitions', async () => {
  // Mock API response for no definitions found
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ title: "No Definitions Found" })
    })
  );

  render(<App />);

  //No definitions into the search bar
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  fireEvent.change(searchInput, { target: { value: 'unknownword' } });

  // Click the search button
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  await waitFor(() => {
    const errorMsg = screen.getByText('No Definitions Found');
    expect(errorMsg).toBeInTheDocument();
  });
});




