import { useState } from 'react';
import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { Container } from 'react-bootstrap';

function App() {
  //orderPhase needs to be 'inprogress, review, or completed
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry; //default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <div className="App">
      <OrderDetailsProvider>
        <Container>
          {
            <Component setOrderPhase={setOrderPhase} />
          }
        </Container>
      </OrderDetailsProvider>
    </div>
  );
}

export default App;
