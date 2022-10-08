import React from 'react';
import { useOrderDetails } from '../contexts/OrderDetails';
import Options from './Options';

function OrderEntry() {
  const [orderDetails] = useOrderDetails(); 
  return (
    <>
    <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />;
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
    </>
  );
}

export default OrderEntry;
