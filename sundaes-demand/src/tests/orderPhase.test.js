import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import App from '../App'

test("order phases for happy path", async () => {
    //render app
    render(<App />);

    const user = userEvent.setup()
    //add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole('spinbutton', 
    {
        name:"Vanilla"
    })

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    const chocolateInput = await screen.findByRole('spinbutton', 
    {
        name:"Chocolate"
    })

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
        name:'Cherries'
    })

    await user.click(cherriesCheckbox);


    // find and click order button
    const orderSummaryButton = screen.getByRole('button',{
        name: /order sundae/i,
    })

    await user.click(orderSummaryButton);

    //check summary information based on order
    const summaryHeading = screen.getByRole('heading',{
        name:'Order Summary'
    })
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading',{
        name:'Scoops: $6.00'
    })
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeadings = screen.getByRole('heading',{
        name:'Toppings: $1.50'
    })
    expect(toppingsHeadings).toBeInTheDocument();

    //check summary option items
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
    expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
    expect(screen.getByText('Cherries')).toBeInTheDocument()

    //accept terms and coditions and click button to confirm order
    const tcCheckbox = screen.getByRole('checkbox',{
        name: /terms and conditions/i
    })
    await user.click(tcCheckbox)

    const confirmOrderButton = screen.getByRole('button',{
        name: /confirm order/i
    })

    await user.click(confirmOrderButton)

    //confirm order number on confirmation page
    //this one is async because there is a POST request to server in betweemn and confirmation pages
    const thankYouHeader = await screen.findByRole('heading',{
        name: "Thank You!"
    })
    expect(thankYouHeader).toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i)
    expect(orderNumber).toBeInTheDocument();

    // click new order button
    const newOrderButton = screen.getByRole('button',{
        name: /new order/i
    })
    await user.click(newOrderButton)

    //check that scoops and toppings subtotals have been reset
    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();
    //do we need to await anything to avoid test errors
    await screen.findByRole('spinbutton', {name: 'Vanilla'})
    await screen.findByRole('checkbox', {name: 'Cherries'})
})