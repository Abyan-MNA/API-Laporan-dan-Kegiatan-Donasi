const express = require("express");
// const db = require("../services/db");
import db from "../services/db"; // Pastikan path ini sesuai dengan struktur proyek Anda
const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT * FROM kegiatan_donasi ORDER BY id_kegiatan`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/**
 * GET /kegiatan/:id
 * Ambil satu kegiatan berdasarkan ID
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM kegiatan_donasi WHERE id_kegiatan = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    if (!row)
      return res.status(404).json({ error: "Kegiatan tidak ditemukan" });
    res.json(row);
  });
});

/**
 * POST /kegiatan
 * Tambah kegiatan baru
 * Body: { nama_kegiatan, deskripsi, tanggal_mulai, tanggal_selesai, target_donasi, status }
 */
router.post("/", (req, res) => {
  const {
    nama_kegiatan,
    deskripsi,
    tanggal_mulai,
    tanggal_selesai,
    target_donasi,
    status,
  } = req.body;
  const sql = `
    INSERT INTO kegiatan_donasi 
      (nama_kegiatan, deskripsi, tanggal_mulai, tanggal_selesai, target_donasi, total_terkumpul, status)
    VALUES (?, ?, ?, ?, ?, 0, ?)
  `;
  db.run(
    sql,
    [
      nama_kegiatan,
      deskripsi,
      tanggal_mulai,
      tanggal_selesai,
      target_donasi,
      status,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      // this.lastID berisi id_kegiatan baru
      res.status(201).json({ id_kegiatan: this.lastID });
    }
  );
});

/**
 * PUT /kegiatan/:id
 * Update data kegiatan
 * Body boleh berisi sebagian atau semua kolom: { nama_kegiatan, deskripsi, tanggal_mulai, tanggal_selesai, target_donasi, total_terkumpul, status }
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  // mapping body ke SQL SET clause
  for (const key of [
    "nama_kegiatan",
    "deskripsi",
    "tanggal_mulai",
    "tanggal_selesai",
    "target_donasi",
    "total_terkumpul",
    "status",
  ]) {
    if (req.body[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  }
  if (fields.length === 0) {
    return res.status(400).json({ error: "Tidak ada field yang di-update" });
  }

  const sql = `
    UPDATE kegiatan_donasi 
    SET ${fields.join(", ")}
    WHERE id_kegiatan = ?
  `;
  values.push(id);

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Kegiatan tidak ditemukan" });
    }
    res.json({ updated: this.changes });
  });
});

/**
 * DELETE /kegiatan/:id
 * Hapus kegiatan
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM kegiatan_donasi WHERE id_kegiatan = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Kegiatan tidak ditemukan" });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
