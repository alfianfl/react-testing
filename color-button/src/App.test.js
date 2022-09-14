import { render, screen, fireEvent } from '@testing-library/react';
import { replaceCamelWithSpaces } from './App';
import App from './App';

test('Button has correct initial color', () => {
  render(<App />);
  const buttonColor = screen.getByRole('button', {
    name: 'Change To Midnight Blue'
  });
  expect(buttonColor).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('Button turn blue when clicked', () => {
  render(<App />);
  const buttonColor = screen.getByRole('button', {
    name: 'Change To Midnight Blue'
  });
  fireEvent.click(buttonColor);

  expect(buttonColor).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  expect(buttonColor.textContent).toBe('Change To Medium Violet Red');
});

test('Initial Condition Checked', () => {
  render(<App />);
  const checkboxInput = screen.getByRole('checkbox');
  const buttonColor = screen.getByRole('button', {
    name: 'Change To Midnight Blue'
  });

  expect(buttonColor).toBeEnabled();
  expect(checkboxInput).not.toBeChecked();
});

test('Input checkbox is checked', () => {
  render(<App />);
  const checkboxInput = screen.getByRole('checkbox', {
    name: 'Disabled Button'
  });
  const buttonColor = screen.getByRole('button', {
    name: 'Change To Midnight Blue'
  });

  fireEvent.click(checkboxInput);
  expect(buttonColor).toBeDisabled();
  expect(checkboxInput).toBeChecked();

  fireEvent.click(checkboxInput);
  expect(buttonColor).toBeEnabled();
  expect(checkboxInput).not.toBeChecked();
});

test('Disabled button clicked to gray and reverts to red', () => {
  render(<App />);
  const checkboxInput = screen.getByRole('checkbox', {
    name: 'Disabled Button'
  });
  const buttonColor = screen.getByRole('button', {
    name: 'Change To Midnight Blue'
  });

  // disabled button
  fireEvent.click(checkboxInput);
  expect(buttonColor).toHaveStyle({ backgroundColor: 'gray' });

  // enabled button
  fireEvent.click(checkboxInput);
  expect(buttonColor).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('Disabled button clicked to gray and reverts blue', () => {
  render(<App />);
  const checkboxInput = screen.getByRole('checkbox', {
    name: 'Disabled Button'
  });
  const buttonColor = screen.getByRole('button', {
    name: 'Change To Midnight Blue'
  });

  fireEvent.click(buttonColor);

  // disabled button
  fireEvent.click(checkboxInput);
  expect(buttonColor).toHaveStyle({ backgroundColor: 'gray' });

  // enabled button
  fireEvent.click(checkboxInput);
  expect(buttonColor).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces bore camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for mutiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
