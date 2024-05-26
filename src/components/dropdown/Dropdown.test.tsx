import { render, screen, fireEvent } from '@testing-library/react';
import DropdownComponent from './Dropdown';
var menu = [
  {
    id: '1',
    name: 'test1',
    isSelected: false,
  },
  {
    id: '1',
    name: 'test2',
    isSelected: true,
  },
];
var setFiltercriteria = jest.fn();
test('renders Dropdown with default selection', async () => {
  render(
    <DropdownComponent menu={menu} setFiltercriteria={setFiltercriteria} />,
  );
  const linkElement = screen.getByText(/test2/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Dropdown and calls setFiltercriteria on item change', async () => {
  render(
    <DropdownComponent menu={menu} setFiltercriteria={setFiltercriteria} />,
  );
  await fireEvent.click(screen.getByText(/test2/i));
  const linkElement1 = screen.getByText(/test1/i);
  expect(linkElement1).toBeInTheDocument();
  await fireEvent.click(screen.getByText(/test1/i));
  expect(setFiltercriteria).toHaveBeenCalled();
});
