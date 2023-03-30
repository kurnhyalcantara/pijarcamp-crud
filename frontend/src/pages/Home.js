import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import AddProduct from '../components/AddProduct';
import ShowProduct from '../components/ShowProduct';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        await axios.get('http://localhost:5000/products').then((res) => {
          setProducts(res.data.data.products);
        });
      } catch (error) {
        return alert(error.message);
      }
    };
    getProducts();
  }, [products]);

  return (
    <div className="App">
      <header className="App-header">Pijar Camp</header>
      <main className="Main-app row">
        <AddProduct className="col-md-4" />
        <ShowProduct className="col-md-8" allProducts={products} />
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
