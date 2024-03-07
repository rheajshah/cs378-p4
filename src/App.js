import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import CityWeather from './CityWeather';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Route and Switch

function App() {
  return (
    <div>
      <BrowserRouter basename="/cs378-p4">
        <Routes>
          <Route path="/" element={(<Home/>)} />
          <Route path='/weather' element={<CityWeather/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
