import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const [productNameValue, setProductNameValue] = useState('');
  const [hargaValue, setHargaValue] = useState('');
  const [jumlahValue, setJumlahValue] = useState('');
  const [keterangan, setKeteranganValue] = useState('');
  const [product, setProduct] = useState({});

  const handleEditProduk = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:5000/products/${productId}`, {
          namaProduk: productNameValue,
          harga: hargaValue,
          jumlah: jumlahValue,
          keterangan: keterangan,
        })
        .then((res) => {
          if (res.status === 200) {
            alert(
              `${res.data.message}. Klik OK untuk memuat kembali data terbaru`
            );
            window.location.reload();
          }
        });
    } catch (error) {
      return alert(error.message);
    }
  };

  const handleDeleteProduk = async (e) => {
    e.preventDefault();
    alert('Anda yakin ingin menghapus produk ini');
    try {
      await axios
        .delete(`http://localhost:5000/products/${productId}`)
        .then((res) => {
          if (res.status === 200) {
            alert(`${res.data.message}. Klik OK untuk kembali ke home`);
            window.location.href = '/';
          }
        });
    } catch (error) {
      return alert(error.message);
    }
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        await axios
          .get(`http://localhost:5000/products/${productId}`)
          .then((res) => {
            const { data } = res.data;
            setProduct(data.product);
            setProductNameValue(data.product[0].namaProduk);
            setHargaValue(data.product[0].harga);
            setJumlahValue(data.product[0].jumlah);
            setKeteranganValue(data.product[0].keterangan);
          });
      } catch (error) {
        return {
          status: error.status,
          message: error.message,
        };
      }
    };
    getProductById();
  }, [productId]);

  return (
    <div className="Form-input row">
      <div className="col-md-6">
        <p className="fw-bold">Id:</p>
        <div style={{ fontSize: '14px' }}>{product[0]?.id}</div>
        <p className="fw-bold">Nama Produk:</p>
        <div style={{ fontSize: '14px' }}>{product[0]?.namaProduk}</div>
        <p className="fw-bold">Harga Satuan:</p>
        <div style={{ fontSize: '14px' }}>{product[0]?.harga}</div>
        <p className="fw-bold">Stok:</p>
        <div style={{ fontSize: '14px' }}>{product[0]?.jumlah}</div>
        <p className="fw-bold">Keterangan:</p>
        <div style={{ fontSize: '14px' }}>{product[0]?.keterangan}</div>
      </div>
      <form className="col-md-6">
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
        <div className="row">
          <input
            type="submit"
            value="Edit detail"
            className="col-md-6"
            onClick={handleEditProduk}
          />
          <input
            type="submit"
            value="Hapus produk"
            className="col-md-6"
            style={{ backgroundColor: '#ff0000', marginLeft: '2rem' }}
            onClick={handleDeleteProduk}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
