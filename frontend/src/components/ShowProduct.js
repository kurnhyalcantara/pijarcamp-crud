import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowProduct = ({ className, allProducts }) => {
  const [searchByIdValue, setSearchByIdValue] = useState('');
  const [searchByQueryNameValue, setSearchByQueryNameValue] = useState('');
  const [products, setProducts] = useState([]);
  const [fetch, setFetch] = useState(true);
  const navigate = useNavigate();

  const handleSearchById = async (e) => {
    e.preventDefault();
    try {
      setFetch(false);
      await axios
        .get(`http://localhost:5000/products/${searchByIdValue}`)
        .then((res) => {
          setProducts(res.data.data.product);
          console.log(res.data);
        });
    } catch (error) {
      return alert(error.message);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    if (fetch) {
      setProducts(allProducts);
    }
  }, [fetch, allProducts]);

  useEffect(() => {
    const getProductByQueryName = () => {
      return products.filter((product) =>
        Object.values(product).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(searchByQueryNameValue.toLowerCase())
        )
      );
    };
    if (searchByQueryNameValue) {
      setProducts(getProductByQueryName());
    }
  }, [searchByQueryNameValue, products]);

  return (
    <div className={`product-container ${className}`}>
      <h1>Produk</h1>
      <div className="row">
        <div className="Search-by-id-container col-6">
          <input
            type="text"
            name="search-by-id"
            id="search-by-id"
            placeholder="Search by Id"
            value={searchByIdValue}
            onChange={(e) => setSearchByIdValue(e.target.value)}
          />
          <input type="submit" value="Cari" onClick={handleSearchById} />
        </div>
        <input
          type="text"
          name="search-by-query-name"
          id="search-by-query-name"
          placeholder="Search By Name"
          className="col-6"
          value={searchByQueryNameValue}
          onChange={(e) => setSearchByQueryNameValue(e.target.value)}
        />
      </div>
      <div className="container px-5">
        <button onClick={handleClear}>Clear</button>
        <div className="row mt-5 g-4">
          {products &&
            products?.map((product) => {
              return (
                <div
                  className="card p-3 col-md-6"
                  style={{ cursor: 'pointer' }}
                  key={product.id}
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  <div
                    className="text-secondary mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    Updated at: {product.updatedAt}
                  </div>
                  <h3>{product.namaProduk}</h3>
                  <p>{product.keterangan}</p>
                  <div className="Detail-product">
                    <div className="row flex justify-between">
                      <div className="col-6">
                        <span style={{ fontWeight: 700 }}>Rp</span>
                        {product.harga}
                      </div>
                      <div className="col-6">
                        <span>Stok: </span>
                        {product.jumlah}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
