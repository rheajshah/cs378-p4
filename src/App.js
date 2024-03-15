import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Route and Switch

function App() {
  return (
    <div>
      <BrowserRouter basename="/cs378-p4">
        <Routes>
          <Route path="/" element={(<Home/>)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
