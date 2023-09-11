
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App'; 

test('renders My Dictionary App', async () => {  // fetch API here

 
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ word: "test", phonetics: [{ audio: "audio_url" }], meanings: [{ definitions: [{ definition: "This is a test definition" }] }] }])
    })
  );
  
  render(<App />);
  
  const titleElement = screen.getByText(/My Dictionary App/i);
  expect(titleElement).toBeInTheDocument();
 

  //  search bar
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  fireEvent.change(searchInput, { target: { value: 'test' } });

  // search button
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

   await waitFor(() => {  
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

test('shows an error when the search field is empty', async () => {
  render(<App />);

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  await waitFor(() => {
    const errorMsg = screen.getByText('Search field is empty.');
    expect(errorMsg).toBeInTheDocument();
  });
});

//  test('showa an error message when No Definitions Found', async () =>
// {
//   global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ title: "No Definitions Found" })
//   })
// );
//   render(<App />);
//   const searchButton = screen.getByText('Search');
//   fireEvent.click(searchButton);

//   await waitFor(() => {
//     const noDefinitionError = screen.queryByText('No Definitions Found');
//     expect(noDefinitionError).toBeInTheDocument();

//   },{timeout:5000});

// });

