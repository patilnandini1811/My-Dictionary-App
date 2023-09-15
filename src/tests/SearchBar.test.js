import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import'@testing-library/jest-dom/extend-expect';

import SearchBar from '../components/SearchBar';

// Test: renders SearchBar component and handles input
test('renders SearchBar component and handles input', async () => {
  const setWordMock = jest.fn();
  const fetchWordInfoMock = jest.fn();

  render(<SearchBar setWord={setWordMock} fetchWordInfo={fetchWordInfoMock} />);

  
  expect(screen.getByPlaceholderText('Search for a word..')).toBeInTheDocument();//  typing 'test' into the search bar
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  userEvent.type(searchInput, 'test');

  
  await waitFor (() => {
    expect(setWordMock).toHaveBeenCalledWith('test');
  });

  
  const searchButton = screen.getByText('Search');
  userEvent.click(searchButton);

  
  await waitFor(() => {
    expect(fetchWordInfoMock).toHaveBeenCalled();
  });
});


test('initial render has empty input', () => {
  render(<SearchBar setWord={() => {}} fetchWordInfo={() => {}} />);
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  expect(searchInput.value).toBe('');
});



