import { render, screen, fireEvent } from '@testing-library/react';
import { CountryWidget } from './CountryWidget';

var getDetails = jest.fn();
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
test('renders CountryWidget with all required fields', () => {
  render(<CountryWidget data={data} getDetails={getDetails} />);
  const linkElement = screen.getByText(/India/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByText(/See more/i);
  expect(linkElement1).toBeInTheDocument();
});

test('renders CountryWidget with formatted population', async () => {
  render(<CountryWidget data={data} getDetails={getDetails} />);
  const linkElement = screen.getByText(/111,111/i);
  expect(linkElement).toBeInTheDocument();
  const text = screen.getByAltText(/india map/i);
  expect(text).toBeInTheDocument();
});

test('click of see more should call props callback function', async () => {
  render(<CountryWidget data={data} getDetails={getDetails} />);
  await fireEvent.click(screen.getByText(/See more/i));
  expect(getDetails).toHaveBeenCalled();
});
