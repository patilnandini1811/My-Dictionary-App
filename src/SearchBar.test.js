// SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './components/SearchBar';

test('renders SearchBar component and handles input', () => {
  const setWordMock = jest.fn();
  const fetchWordInfoMock = jest.fn();

  render(<SearchBar setWord={setWordMock} fetchWordInfo={fetchWordInfoMock} />);

  
  expect(screen.getByPlaceholderText('Search for a word..')).toBeInTheDocument();

  
  const searchInput = screen.getByPlaceholderText('Search for a word..');
  fireEvent.change(searchInput, { target: { value: 'test' }});

  
  expect(setWordMock).toHaveBeenCalledWith('test');

  
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  
  expect(fetchWordInfoMock).toHaveBeenCalled();
});
