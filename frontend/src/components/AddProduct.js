import { useState } from 'react';
import axios from 'axios';

export default function Home({ className }) {
  const [productNameValue, setProductNameValue] = useState('');
  const [hargaValue, setHargaValue] = useState('');
  const [jumlahValue, setJumlahValue] = useState('');
  const [keterangan, setKeteranganValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <div className={`Form-input ${className}`}>
      <form onSubmit={handleSubmit}>
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
  );
}
