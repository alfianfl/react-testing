import React from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

function OrderEntry({setOrderPhase}) {
  const [orderDetails] = useOrderDetails(); 
  return (
    <>
    <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />;
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </>
  );
}

export default OrderEntry;
