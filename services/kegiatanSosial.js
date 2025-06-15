const { prisma } = require("../load/database");

const getActivities = async (id = undefined, limit = 10) => {
  let activities;
  if (id) {
    activities = await prisma.kegiatan.findUnique({
      where: { id: id },
    });
  } else {
    activities = await prisma.kegiatan.findMany({
      take: limit,
      orderBy: {
        tanggal_mulai: "desc",
      },
    });
  }
  if (!activities) {
    const err = new Error("Gagal mendapatkan data kegiatan");
    err.status = 404;
    throw err;
  }
  return activities;
};

const createActivities = async (data) => {
  const { judul, deskripsi, lokasi, tanggal_mulai, tanggal_selesai, status } =
    data;

  if (!judul || !tanggal_mulai) {
    const err = new Error("Judul dan tanggal mulai harus diisi");
    err.status = 400;
    throw err;
  }

  const newActivity = await prisma.kegiatan.create({
    data: {
      judul,
      deskripsi,
      lokasi: lokasi ?? undefined,
      tanggal_mulai: new Date(tanggal_mulai),
      tanggal_selesai: tanggal_selesai ? new Date(tanggal_selesai) : undefined,
      status: status ?? undefined,
    },
  });

  if (!newActivity) {
    const err = new Error("Gagal menambahkan kegiatan");
    err.status = 500;
    throw err;
  }
  return newActivity;
};

const deleteActivities = async (id) => {
  const activity = await prisma.kegiatan.delete({ where: { id } });
  if (!activity) {
    const err = new Error(`Gagal menghapus kegiatan`);
    err.status = 404;
    throw err;
  }
  return activity;
};

const cekActivitiesId = async (id) => {
  if (!/^\d+$/.test(id)) {
    const err = new Error(`Id harus berupa angka`);
    err.status = 400;
    throw err;
  }

  const activity = await prisma.kegiatan.findUnique({
    where: { id: parseInt(id) },
  });
  if (!activity) {
    const err = new Error(`Kegiatan tidak ditemukan`);
    err.status = 404;
    throw err;
  }
  return parseInt(id);
};

const updateActivities = async (id, data) => {
  const { judul, deskripsi, lokasi, tanggal_mulai, tanggal_selesai, status } =
    data;
  const allowedFields = [
    "judul",
    "deskripsi",
    "lokasi",
    "tanggal_mulai",
    "tanggal_selesai",
    "status",
  ];

  if (!allowedFields.every((field) => field in data)) {
    console.log(data);
    const err = new Error(
      `Field tidak lengkap. Harus ada: ${allowedFields.join(", ")}`
    );
    err.status = 400;
    throw err;
  }

  const updatedActivity = await prisma.kegiatan.update({
    where: { id: id },
    data: {
      judul,
      deskripsi,
      lokasi: lokasi ?? undefined,
      tanggal_mulai: new Date(tanggal_mulai),
      tanggal_selesai: tanggal_selesai ? new Date(tanggal_selesai) : undefined,
      status: status ?? undefined,
    },
  });

  if (!updatedActivity) {
    const err = new Error("Gagal memperbarui kegiatan");
    err.status = 500;
    throw err;
  }
  return updatedActivity;
};

const updateActivityPartial = async (id, data) => {
  const allowedFields = [
    "judul",
    "deskripsi",
    "lokasi",
    "tanggal_mulai",
    "tanggal_selesai",
    "status",
  ];
  const updateData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      if (field === "tanggal_mulai") {
        updateData.tanggal_mulai = new Date(data[field]);
      } else if (field === "tanggal_selesai") {
        updateData.tanggal_selesai = new Date(data[field]);
      } else {
        updateData[field] = data[field];
      }
    }
  }

  if (Object.keys(updateData).length === 0) {
    const err = new Error("Tidak ada data yang diperbarui");
    err.status = 400;
    throw err;
  }
  const updatedActivity = await prisma.kegiatan.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
  if (!updatedActivity) {
    const err = new Error("Gagal memperbarui kegiatan");
    err.status = 500;
    throw err;
  }
  return updatedActivity;
};
// const createActivities = async () => {

// }

module.exports = {
  getActivities,
  cekActivitiesId,
  deleteActivities,
  createActivities,
  updateActivities,
  updateActivityPartial,
};
