// routes/laporan.js
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// buka koneksi ke database SQLite
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Gagal connect ke database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});
// GET  /laporan
// Ambil semua laporan
router.get("/", (req, res) => {
  const sql = `SELECT * FROM laporan_kegiatan ORDER BY id_laporan`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET  /laporan/:id
// Ambil satu laporan berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM laporan_kegiatan WHERE id_laporan = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) return res.status(404).json({ error: "Laporan tidak ditemukan" });
    res.json(row);
  });
});

// POST /laporan
// Tambah laporan baru
// Body: { id_kegiatan, tanggal_laporan, jumlah_donasi, keterangan, lampiran_file, created_by }
router.post("/", (req, res) => {
  const {
    id_kegiatan,
    tanggal_laporan,
    jumlah_donasi,
    keterangan,
    lampiran_file,
    created_by,
  } = req.body;
  const sql = `
    INSERT INTO laporan_kegiatan
      (id_kegiatan, tanggal_laporan, jumlah_donasi, keterangan, lampiran_file, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [
      id_kegiatan,
      tanggal_laporan,
      jumlah_donasi,
      keterangan,
      lampiran_file,
      created_by,
    ],
    function (err) {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id_laporan: this.lastID });
    }
  );
});

// PUT /laporan/:id
// Update laporan
// Body: any of { id_kegiatan, tanggal_laporan, jumlah_donasi, keterangan, lampiran_file, created_by }
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  // Hanya ambil field yang ada di body
  [
    "id_kegiatan",
    "tanggal_laporan",
    "jumlah_donasi",
    "keterangan",
    "lampiran_file",
    "created_by",
  ].forEach((key) => {
    if (req.body[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  });

  if (fields.length === 0) {
    return res.status(400).json({ error: "Tidak ada field untuk di-update" });
  }

  const sql = `
    UPDATE laporan_kegiatan
    SET ${fields.join(", ")}
    WHERE id_laporan = ?
  `;
  values.push(id);

  db.run(sql, values, function (err) {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Laporan tidak ditemukan" });
    }
    res.json({ updated: this.changes });
  });
});

// DELETE /laporan/:id
// Hapus laporan
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM laporan_kegiatan WHERE id_laporan = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Laporan tidak ditemukan" });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
