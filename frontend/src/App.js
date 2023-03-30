import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/edit/:productId" element={<EditProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
