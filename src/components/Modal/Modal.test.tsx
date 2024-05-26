import { render, screen, fireEvent } from '@testing-library/react';
import { ModalComponent } from './Modal';

test('renders Modal', async () => {
  var handleModal = jest.fn();
  var showModal = true;
  render(
    <ModalComponent handleModal={handleModal} showModal={showModal}>
      <div>Modal Child</div>
    </ModalComponent>,
  );
  const linkElement = screen.getByText(/Modal Child/i);

  expect(linkElement).toBeInTheDocument();
  const closeElement = screen.getByText(/Close/i);
  expect(closeElement).toBeInTheDocument();
  await fireEvent.click(screen.getByText(/Close/i));
  expect(handleModal).toHaveBeenCalled();
});
