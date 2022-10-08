import { useState } from 'react';
import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/summary/SummaryForm';
import {OrderDetailsProvider} from "./pages/contexts/OrderDetails"

function App() {
  return (
    <div className="App">
      <SummaryForm />
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </div>
  );
}

export default App;
