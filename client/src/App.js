import React from 'react'
import {Route, Routes} from 'react-router-dom'
import DishPage from './pages/DishPage/DishPage';
import HomePage from './pages/HomePage/HomePage';
import OrderPage from './pages/OrderPage/OrderPage';
console.log(start)
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/dish' element={<DishPage/>} />
          <Route path='/order' element={<OrderPage/>} />
      </Routes>
    </div>
  );
}

export default App;
