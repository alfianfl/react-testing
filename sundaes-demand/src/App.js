import { useState } from 'react';
import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <div className="App">
      <SummaryForm />
      <OrderEntry />
    </div>
  );
}

export default App;
