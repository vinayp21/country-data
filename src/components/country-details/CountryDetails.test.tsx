import { render, screen } from '@testing-library/react';
import { CountryDetails } from './CountryDetails';

var data = {
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
};
test('renders CountryDetails with all required fields', () => {
  render(<CountryDetails countryData={data} />);
  const linkElement = screen.getByText(/India/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByText(/Delhi/i);
  expect(linkElement1).toBeInTheDocument();
});

test('renders CountryDetails with formatted population with img alt text', async () => {
  render(<CountryDetails countryData={data} />);
  const linkElement = screen.getByText(/111,111/i);
  expect(linkElement).toBeInTheDocument();
  const text = screen.getByAltText(/india map/i);
  expect(text).toBeInTheDocument();
});

test('should render currencies and languages', async () => {
  render(<CountryDetails countryData={data} />);
  const text = screen.getByText(/Hindi/i);
  expect(text).toBeInTheDocument();
  const text1 = screen.getByText(/Kannada/i);
  expect(text1).toBeInTheDocument();
  const text2 = screen.getByText(/Rupee/i);
  expect(text2).toBeInTheDocument();
});
