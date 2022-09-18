import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /Terms and Conditions/i
  });

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i
  });

  expect(checkbox).not.toBeChecked();

  expect(confirmButton).toBeDisabled();
});

test('checkbox disables button on first click and enables on second click', async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  const checkbox = screen.getByRole('checkbox', {
    name: /Terms and Conditions/i
  });

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i
  });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover respond to hover', async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  // popover starts out hidden
  // queryByText untuk dom diluar element biasanya digunakan dari library css spt bootstrap, tailwind, dsb
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndCondition = screen.queryByText(/Terms and Conditions/i);
  await user.hover(termsAndCondition);
  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  // popover disappears when mouse out
  await user.unhover(termsAndCondition);
  const overlay = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(overlay).not.toBeInTheDocument();
});
