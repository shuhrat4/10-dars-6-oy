import { Routes, Route } from 'react-router-dom';
import './App.css';
import SingleProduct from './pages/SingleProduct';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<SingleProduct />} />
    </Routes>
  );
}

export default App;
