/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('produk', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama_produk: {
      type: 'TEXT',
      notNull: true,
    },
    keterangan: {
      type: 'TEXT',
    },
    harga: {
      type: 'INTEGER',
      notNull: true,
    },
    jumlah: {
      type: 'INTEGER',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('produk');
};
