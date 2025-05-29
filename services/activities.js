const prisma = require("./db");

const getActivities = async (id = undefined) => {
  let activities;
  if (id) {
    activities = await prisma.kegiatan.findUnique({
      where: { id: id },
    });
  } else {
    activities = await prisma.kegiatan.findMany();
  }
  if (!activities) {
    throw new Error("Gagal mendapatkan data kegiatan");
  }
  return activities;
};

const cekActivitiesId = async (id) => {
  const activity = await prisma.kegiatan.findUnique({ where: { id } });
  if (!activity) throw new Error(`Kegiatan dengan tidak ditemukan`);
  return id;
};

// const createActivities = async () => {

// }

module.exports = { getActivities, cekActivitiesId };
