const express = require("express");
const activity_info = express.Router();
const { prisma } = require("../load/database");
const {
  getActivities,
  cekActivitiesId,
  deleteActivities,
  createActivities,
  updateActivities,
  updateActivityPartial,
} = require("../services/kegiatanSosial");
const { authorizeRole } = require("../middleware/authMiddleware");

activity_info.get("/", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const cekId = await cekActivitiesId(id);
      const activity = await getActivities(cekId);
      return res.status(200).json({
        message: "Berhasil mengambil kegiatan",
        data: activity,
      });
    } else {
      const activities = await getActivities();
      return res.status(200).json({
        message: "Berhasil mengambil semua kegiatan",
        data: activities,
      });
    }
  } catch (err) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
});

// activity_info.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("ID Kegiatan:", id);
//     const cekId = await cekActivitiesId(id);
//     const activity = await getActivities(cekId);
//     return res.status(200).json({
//       message: "Berhasil mengambil kegiatan",
//       data: activity,
//     });
//   } catch (err) {
//     return res.status(err.status).json({
//       message: err.message,
//     });
//   }
// });

activity_info.post(
  "/",
  authorizeRole(["admin", "volunteer"]),
  async (req, res) => {
    try {
      const data = req.body;
      const newActivity = await createActivities(data);
      return res.status(201).json({
        message: "Kegiatan berhasil ditambahkan",
        data: newActivity,
      });
    } catch (err) {
      return res.status(err.status).json({
        message: err.message,
      });
    }
  }
);

activity_info.delete("/", authorizeRole(["admin"]), async (req, res) => {
  try {
    const id = req.query.id;
    const cekId = await cekActivitiesId(id);
    const activity = await deleteActivities(cekId);
    return res.status(200).json({
      message: "Berhasil menghapus kegiatan",
      data: activity,
    });
  } catch (err) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
});

activity_info.put(
  "/",
  authorizeRole(["admin", "volunteer"]),
  async (req, res) => {
    try {
      const id = req.query.id;
      const data = req.body;
      console.log("ID Kegiatan:", id);
      console.log("Data yang diterima:", data);
      const cekId = await cekActivitiesId(parseInt(id));
      const updatedActivity = await updateActivities(cekId, data);
      return res.status(200).json({
        message: "Kegiatan berhasil diperbarui",
        data: updatedActivity,
      });
    } catch (err) {
      return res.status(err.status).json({
        message: err.message,
      });
    }
  }
);
activity_info.patch(
  "/",
  authorizeRole(["admin", "volunteer"]),
  async (req, res) => {
    try {
      const id = req.query.id;
      const data = req.body;
      const cekId = await cekActivitiesId(parseInt(id));
      const updatedActivity = await updateActivityPartial(cekId, data);
      return res.status(200).json({
        message: "Kegiatan berhasil diperbarui",
        data: updatedActivity,
      });
    } catch (err) {
      return res.status(err.status).json({
        message: err.message,
      });
    }
  }
);

module.exports = activity_info;
