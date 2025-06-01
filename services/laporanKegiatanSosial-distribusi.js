const { prisma } = require("../load/database");
const AppError = require("../utils/AppError");

// Get summary distribution
const getSummaryDistribution = async (distribusi_id = undefined, page = 1, limit_per_page = 1000) => {
  let stmtGetData;
  let curentIndex = limit_per_page * (page - 1);
  if (distribusi_id) {
    stmtGetData = await prisma.laporan_distribusi.findMany({
      where: {distribusiId: parseInt(distribusi_id)},
      take: limit_per_page,
      skip: curentIndex,
      orderBy: { id: "asc" }
    });
  } else {
    stmtGetData = await prisma.laporan_distribusi.findMany({
      take: limit_per_page,
      skip: curentIndex,
      orderBy: { id: "asc" }
    });
  }
  if (!stmtGetData) {
    throw new AppError("Data tidak ada atau kegagalan suatu data / No data or failed in data", 404);
  }
  return stmtGetData;
};
// Get summary distribution by social activity ID
const getSummaryDistBySocialActID = async (id = undefined, page = 1, limit_per_page = 1000) => {
  let stmtGetData;
  let curentIndex = limit_per_page * (page - 1);
  if (!id) {
    throw new AppError("ID Kegiatan sosial diperlukan / Social Activity ID is required", 400);
  } else {
    stmtGetData = await prisma.laporan_distribusi.findMany({
      where: { kegiatanId: parseInt(id) },
      take: limit_per_page,
      skip: curentIndex,
      orderBy: { id: "asc" }
    });
  }
  if (!stmtGetData) {
    throw new AppError("Data tidak ada atau kegagalan suatu data / No data or failed in data", 404);
  }
  return stmtGetData;
}

// Create summary donate in social activity
const createSummaryDistInSocialAct = async (data) => {
  const { distribusiId, penerima, tanggal_distribusi, metode_distribusi, status_konfirmasi = "accepted", catatan, kegiatanId } = data;
  if (!tanggal_distribusi) {
    throw AppError("Tanggal donasi dapat diisi pada tanggal kegiatan / Donate date-time can fill with social activity date", 400);
  }
  const newSumDistSocialAct = await prisma.laporan_distribusi.create({
    data: {
      distribusiId,
      penerima, metode_distribusi,
      tanggal_distribusi, status_konfirmasi,
      catatan, kegiatanId
    }
  });
  if (!newSumDistSocialAct) {
    throw new AppError("Gagal membuat laporan donasi / Failed create donate summary", 500);
  }
  return newSumDistSocialAct;
};
// Delete while wrong or something else
const deleteSummaryDistribution = async (id) => {
  const stmtDeleteSummaryDist = await prisma.laporan_distribusi.delete({ where:  {id: parseInt(id)} })
  .catch((err) => {
    throw new AppError("Gagal menghapus laporan donasi / Failed delete donate summary/report", 500)}
  );
  // if (!stmtDeleteSummaryDist) {
  //   throw new AppError("Gagal menghapus laporan donasi / Failed delete donate summary/report", 500);
  // }
  return stmtDeleteSummaryDist;
};

module.exports = { 
  getSummaryDistribution,
  getSummaryDistBySocialActID,
  createSummaryDistInSocialAct,
  deleteSummaryDistribution
};