//Task: Tests

// renders My Dictionary App
// shows an error when the search field is empty
// shows an error when the search only contains a single letter
// shows "No Definitions Found" when the word has no definitions
//shows Synonyms
//shows Audio

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import'@testing-library/jest-dom/extend-expect';
import App from '../App';

const server = setupServer(
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en_US/:word', (req, res, ctx) => {
    if (req.params.word === 'unknownword') {
      return res(
        ctx.json({ title: 'No Definitions Found' })
      );
    }
    return res(
      ctx.json([
        {
          word: 'test',
          phonetics: [{ audio: 'audio_url' }],
          meanings: [
            {
              definitions: [
                {
                  definition: 'This is a test definition',
                  synonyms: ['trial', 'examination'],
                }
              ],
              partOfSpeech: 'noun'
            }
          ]
        }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


// Test case:1 fetching data
test('renders My Dictionary App', async () => {
  render(<App />);
  
  const titleElement = screen.getByText(/My Dictionary App/i);
  expect(titleElement).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText('Search for a word..');
  userEvent.type(searchInput, 'test');

  const searchButton = screen.getByText('Search');
  userEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  
  await waitFor(() => {
    expect(screen.getByText('This is a test definition')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('noun')).toBeInTheDocument();
  });
});
// Test case:2 search field is empty
test('shows an error when the search field is empty', async () => {
  render(<App />);
  
  const searchButton = screen.getByText('Search');
  userEvent.click(searchButton);

  await waitFor(() => {
    const errorMsg = screen.getByText('Search field is empty.');
    expect(errorMsg).toBeInTheDocument();
  });
});

// Test case:3 single letter is entered
test('shows an error when the search only contains a single letter', async () => {
  render(<App />);
  
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  userEvent.type(searchInput, 'a');

  const searchButton = screen.getByText('Search');
  userEvent.click(searchButton);

  await waitFor(() => {
    const errorSingleLetter = screen.getByText('Please enter a whole word!');
    expect(errorSingleLetter).toBeInTheDocument();
  });
});

// Test case:4
test('shows "No Definitions Found" when the word has no definitions', async () => {
  render(<App />);
  
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  userEvent.type(searchInput, 'unknownword');

  const searchButton = screen.getByText('Search');
  userEvent.click(searchButton);

  await waitFor(() => {
    const errorMsg = screen.getByText('No Definitions Found');
    expect(errorMsg).toBeInTheDocument();
  });
});
//Test Case:5 Symonyms
test("should get synonyms when searching", async () => {
  render(<App />);
  
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  userEvent.type(searchInput, 'test');
  
  const searchButton = screen.getByText('Search');
  userEvent.click(searchButton);

 
  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  
  await waitFor(() => {
    const synonymsElement = screen.getByText(/Synonyms:/i);
    expect(synonymsElement).toBeInTheDocument();
  });

  
});

// Test case:5 audio
  test("should get audio element when searching", async () =>
  {
    render(<App />);
  
    const searchInput = screen.getByPlaceholderText('Search for a word..');
    userEvent.type(searchInput, 'test');
  
    const searchButton = screen.getByText('Search');
    userEvent.click(searchButton);

    await waitFor(() =>
    {
      const audioElement = screen.getByTestId('audio-element');
      expect(audioElement).toBeInTheDocument();
    });
  });
