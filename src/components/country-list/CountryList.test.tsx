import { render, screen } from '@testing-library/react';
import { CountryList } from './CountryList';
import { act } from 'react';
import { apiData } from '../../mock';

const data = [
  {
    name: 'India',
    population: 111111,
    borders: ['pak'],
    region: 'Asia',
    capital: 'Delhi',
    flag: {
      alt: 'india map',
      png: '',
      svg: '',
    },
    languages: ['Hindi', 'Kannada'],
    borderCountries: ['PAK', 'CHI'],
    currencies: ['Rupee'],
    code: 'IND',
    nativeName: 'india',
  },
];
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn(() => Promise.reject(apiData)),
  }),
) as jest.Mock;

jest.mock('../../db', () => ({
  getAllStoreData: jest.fn().mockReturnValue(data),
}));

test('renders CountryList with input and dropdown component and logs error screen', async () => {
  await act(async () => render(<CountryList />));
  const linkElement = screen.getByText(/Country Name/i);
  expect(linkElement).toBeInTheDocument();
  const input: any = screen.getByLabelText('search-input');
  expect(input.value).toBe('');
  const imgText = screen.getByTestId('error-fallback');
  expect(imgText).toBeInTheDocument();
});
