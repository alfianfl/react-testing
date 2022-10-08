import { render, screen } from '../../../test-utils/testing-library';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';


test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  //   make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toHaveTextContent('$0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('$2.00');

  // update vanilla scoops to 1 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('$6.00');
});

test('update toppings subtotals when toppings change', async () => {
  render(<Options optionType="toppings" />);
  const user = userEvent.setup();

  // make sure total start out at $0.00
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  //add cherries and check sub total
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  //add hot fudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge'
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');

    
  });
  test('grand total updates properly if item is removed', async () => {
    render(< OrderEntry />);

    const user = userEvent.setup();
    //add cherries (topping)
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })

    await user.click(cherriesCheckbox)
    // grand total $1.50

    // update vanilla scopps to 2; grand total should be $5.00
    const vanillaInput = await screen.findByRole('spinbutton', {
      name:'Vanilla'
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    //remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    //check grand total
    const grandTotal =  screen.getByRole('heading', {
      name: /grand total: \$/i
    })
    expect(grandTotal).toHaveTextContent('3.50');

    //remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');

  });
});
