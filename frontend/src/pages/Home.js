import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [productNameValue, setProductNameValue] = useState('');
  const [hargaValue, setHargaValue] = useState('');
  const [jumlahValue, setJumlahValue] = useState('');
  const [keterangan, setKeteranganValue] = useState('');
  const [searchByIdValue, setSearchByIdValue] = useState('');
  const [searchByQueryNameValue, setSearchByQueryNameValue] = useState('');
  const [products, setProducts] = useState([]);
  const [fetch, setFetch] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFetch(false);
      await axios
        .post('http://localhost:5000/products', {
          namaProduk: productNameValue,
          keterangan: keterangan,
          harga: parseInt(hargaValue),
          jumlah: parseInt(jumlahValue),
        })
        .then((res) => {
          alert(res.data.message);
        });
      setFetch(true);
    } catch (error) {
      return alert(error.message);
    }
  };

  const handleSearchById = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get(`http://localhost:5000/products/${searchByIdValue}`)
        .then((res) => {
          setFetch(false);
          setProducts(res.data.data.product);
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
    const getProducts = async () => {
      try {
        await axios.get('http://localhost:5000/products').then((res) => {
          setProducts(res.data.data.products);
        });
      } catch (error) {}
    };
    if (fetch) {
      getProducts();
    }
  }, [products, fetch]);

  return (
    <div className="App">
      <header className="App-header">Pijar Camp</header>
      <main className="Main-app container">
        <div className="Form-input row">
          <form className="col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama-produk"
              id="nama-produk"
              placeholder="Nama Produk"
              value={productNameValue}
              onChange={(e) => setProductNameValue(e.target.value)}
            />
            <input
              type="text"
              name="harga-produk"
              id="harga-produk"
              placeholder="Harga Produk"
              value={hargaValue}
              onChange={(e) => setHargaValue(e.target.value)}
            />
            <input
              type="text"
              name="jumlah-produk"
              id="jumlah-produk"
              placeholder="Jumlah Produk"
              value={jumlahValue}
              onChange={(e) => setJumlahValue(e.target.value)}
            />
            <input
              type="text"
              name="keterangan"
              id="keterangan"
              placeholder="Keterangan"
              value={keterangan}
              onChange={(e) => setKeteranganValue(e.target.value)}
            />
            <input type="submit" value="Tambah produk" />
          </form>
        </div>
        <div className="product-container mt-4 row">
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
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
