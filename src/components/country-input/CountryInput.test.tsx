import { render, screen, fireEvent } from '@testing-library/react';
import { CountryInput } from './CountryInput';

var menu = [
  {
    id: 'name',
    name: 'Country Name',
    isSelected: true,
  },
  {
    id: 'region',
    name: 'Region',
    isSelected: false,
  },
];
var setFiltercriteria = jest.fn();
var handleSearch = jest.fn();
test('renders CountryInput with all required fields', async () => {
  render(
    <CountryInput
      menu={menu}
      setFiltercriteria={setFiltercriteria}
      handleSearch={handleSearch}
      searchValue={'India'}
    />,
  );
  const input: any = screen.getByLabelText('search-input');
  expect(input.value).toBe('India');
  const linkElement1 = screen.getByText(/Country Name/i);
  expect(linkElement1).toBeInTheDocument();
  await fireEvent.change(input, { target: { value: 'USA' } });
  expect(handleSearch).toHaveBeenCalled();
});

test('Test CountryInput to update on changing dropdown', async () => {
  render(
    <CountryInput
      menu={menu}
      setFiltercriteria={setFiltercriteria}
      handleSearch={handleSearch}
      searchValue={'India'}
    />,
  );
  await fireEvent.click(screen.getByText(/Country Name/i));
  const linkElement = screen.getByText(/Region/i);
  expect(linkElement).toBeInTheDocument();
  await fireEvent.click(screen.getByText(/Region/i));
  expect(setFiltercriteria).toHaveBeenCalled();
});
