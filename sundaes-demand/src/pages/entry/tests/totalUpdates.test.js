import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  //   make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $');
  expect(scoopsSubtotal).toHaveTextContent('$0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  });
  user.clear(vanillaInput);
  user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('$2.00');

  // update vanilla scoops to 1 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  });
  user.clear(chocolateInput);
  user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('$6.00');
});
