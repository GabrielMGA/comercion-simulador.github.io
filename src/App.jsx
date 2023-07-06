import { Navigate, Route, Routes } from 'react-router-dom';
import PaymentView from './views/PaymentView';

import SuccessView from './views/SuccessView';
import CancelView from './views/CancelView';

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="payment" element={<PaymentView />} />
        <Route path="success" element={<SuccessView />} />
        <Route path="cancel" element={<CancelView />} />

        <Route path="/" element={<Navigate to="/payment" />} />
      </Routes>
    </>
  );
}

export default App
