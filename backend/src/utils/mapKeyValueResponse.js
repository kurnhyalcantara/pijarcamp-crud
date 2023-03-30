/* eslint-disable camelcase */

const mapKeyValueResponse = ({
  id,
  nama_produk,
  keterangan,
  harga,
  jumlah,
  created_at,
  updated_at,
}) => ({
  id,
  namaProduk: nama_produk,
  keterangan,
  harga,
  jumlah,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = mapKeyValueResponse;
