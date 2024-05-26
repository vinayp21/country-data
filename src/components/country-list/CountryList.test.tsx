import { render, screen } from '@testing-library/react';
import { CountryList } from './CountryList';

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

jest.mock('../../db', () => ({
  getAllStoreData: jest.fn().mockReturnValue(data),
}));

test('renders CountryList header and loader component with dropdown and input', () => {
  render(<CountryList />);
  const linkElement = screen.getByText(/Country Name/i);
  expect(linkElement).toBeInTheDocument();
  const imgText = screen.getByAltText('Loading');
  expect(imgText).toBeInTheDocument();
});
