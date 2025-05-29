const express = require("express");
const router = express.Router();
const prisma = require("../services/db");
const {
  getActivities,
  cekActivitiesId,
  deleteActivities,
  createActivities,
  updateActivities,
  updateActivityPartial,
} = require("../services/activities");

router.get("/", async (req, res) => {
  try {
    const activities = await getActivities();
    return res.status(200).json({
      message: "Berhasil mengambil semua kegiatan",
      data: activities,
    });
  } catch (err) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cekId = await cekActivitiesId(id);
    const activity = await getActivities(cekId);
    return res.status(200).json({
      message: "Berhasil mengambil kegiatan",
      data: activity,
    });
  } catch (err) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
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
});
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
});

module.exports = router;
