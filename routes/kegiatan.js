const express = require("express");
const router = express.Router();
const prisma = require("../services/db");
const { getActivities, cekActivitiesId } = require("../services/activities");
// buka koneksi ke database SQLite

// middleware untuk parse JSON body
// router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const activities = await getActivities();
    return res.status(200).json({
      message: "Berhasil mengambil semua kegiatan",
      data: activities,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cekId = await cekActivitiesId(parseInt(id));
    const activity = await getActivities(cekId);
    return res.status(200).json({
      message: "Berhasil mengambil kegiatan",
      data: activity,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  console.log("Request body:", req.body);
  const { judul, deskripsi, lokasi, tanggal_mulai, tanggal_selesai, status } =
    req.body;

  if (!judul || !tanggal_mulai) {
    return res
      .status(400)
      .json({ error: "Judul, dan tanggal mulai harus diisi" });
  }
  const newActivity = await prisma.kegiatan.create({
    data: {
      judul: judul,
      deskripsi: deskripsi,
      lokasi: lokasi ?? undefined,
      tanggalMulai: new Date(tanggal_mulai),
      tanggalSelesai: tanggal_selesai ? new Date(tanggal_selesai) : undefined,
      status: status ?? undefined,
    },
  });
  if (!newActivity) {
    return res.status(500).json({ error: "Gagal menambahkan kegiatan" });
  }
  return res.status(201).json({
    message: "Kegiatan berhasil ditambahkan",
    data: newActivity,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const activity = await prisma.kegiatan.delete({
    where: { id: parseInt(id) },
  });
  return res.status(200).json({
    message: "Berhasil menghapus kegiatan",
    data: activity,
  });
});

// router.put("/:id", async (req, res)=>{
//   const {id} = req.params;
//   const {} = req.body()

// })

module.exports = router;
