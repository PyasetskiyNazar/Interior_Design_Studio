
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Products from './pages/Products';
import Home from './pages/Home';
import Product from './pages/product/Product';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"
            element={<Home />}
          />
          <Route path="/home"
            element={<Home />}
          />
          <Route path="/products"
            element={<Products />}
          />
          <Route path="/products/:name"
            element={<Product />}
          />
        </Routes>
      </BrowserRouter>


    </div>

  );
}

export default App;
