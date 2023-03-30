const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const mapKeyValueResponse = require('../utils/mapKeyValueResponse');

const pool = new Pool();

const productController = {
  addProduct: async (req, res) => {
    try {
      const { namaProduk, keterangan, harga, jumlah } = req.body;
      const id = `product-${nanoid(16)}`;
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      const query = {
        text: 'INSERT INTO produk VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [
          id,
          namaProduk,
          keterangan,
          harga,
          jumlah,
          createdAt,
          updatedAt,
        ],
      };

      const productId = await pool.query(query);
      if (productId.rows.error) {
        throw new Error(productId.rows.error);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Produk berhasil ditambahkan',
        data: {
          productId: productId.rows[0].id,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  },

  getAllProducts: async (req, res) => {
    const result = await pool.query('SELECT * FROM produk');
    if (!result.rows.length) {
      throw new Error('Data belum ada');
    }

    const resultMap = result.rows.map(mapKeyValueResponse);

    return res.json({
      status: 'success',
      data: {
        products: resultMap,
      },
    });
  },

  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const query = {
        text: 'SELECT id, nama_produk, keterangan, harga, jumlah FROM produk WHERE id = $1',
        values: [productId],
      };

      const result = await pool.query(query);
      if (!result.rows.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Gagal menampilkan produk. Id tidak ditemukan',
        });
      }

      const mapProduk = result.rows.map(mapKeyValueResponse);

      return res.json({
        status: 'success',
        data: {
          product: mapProduk,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  },

  editProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const { namaProduk, keterangan, harga, jumlah } = req.body;

      const query = {
        text: 'UPDATE produk SET nama_produk = $1, keterangan = $2, harga = $3, jumlah = $4 WHERE id = $5 RETURNING id',
        values: [namaProduk, keterangan, harga, jumlah, productId],
      };

      const result = await pool.query(query);
      if (!result.rows.length) {
        throw new Error('Gagal memperbarui produk. Id tidak ditemukan');
      }

      return res.json({
        status: 'success',
        message: 'Produk berhasil diperbarui',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const query = {
        text: 'DELETE FROM produk WHERE id = $1 RETURNING id',
        values: [productId],
      };
      await pool.query(query);
      return res.json({
        status: 'success',
        message: 'Produk berhasil dihapus',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  },
};

module.exports = productController;
