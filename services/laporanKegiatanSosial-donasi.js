const { prisma } = require("../load/database");
const AppError = require("../utils/AppError");

// Get Summary Donate
const getSummaryDonate = async (donate_id = undefined, page = 1, limit_per_page = 1000) => {
  let stmtGetData;
  let curentIndex = limit_per_page * (page - 1);
  if (donate_id) {
    stmtGetData = await prisma.laporan_donasi.findMany({
      where: {donasiId: parseInt(donate_id)},
      take: limit_per_page,
      skip: curentIndex,
      orderBy: { id: "asc" }
    });
  } else {
    stmtGetData = await prisma.laporan_donasi.findMany({
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
// Get summary donate by social activity ID
const getSummaryDonateBySocialActID = async (id = undefined, page = 1, limit_per_page = 1000) => {
  let stmtGetData;
  let curentIndex = limit_per_page * (page - 1);
  if (!id) {
    throw new AppError("ID Kegiatan sosial diperlukan / Social Activity ID is required", 400);
  } else {
    stmtGetData = await prisma.laporan_donasi.findMany({
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
const createSummaryDonateInSocialAct = async (data) => {
  const { donasiId, donaturId, tanggal_donasi, jumlah, jenis_donasi, status = "accepted", bukti_url = "LANGSUNG/JUST QUICK", kegiatanId } = data;
  if (!tanggal_donasi) {
    throw new AppError("Tanggal donasi harus diisi / Donate date must be provided", 400);
  }
  const newSumDonateSocialAct = await prisma.laporan_donasi.create({
    data: {
      donasiId, donaturId,
      tanggal_donasi,
      jumlah, jenis_donasi,
      status, bukti_url, kegiatanId
    }
  });
  if (!newSumDonateSocialAct) {
    throw new AppError("Gagal membuat laporan donasi / Failed create donate summary", 500);
  }
  return newSumDonateSocialAct;
};
// Delete while wrong or something else
const deleteSummaryDonate = async (id) => {
  const stmtDeleteSummaryDonate = await prisma.laporan_donasi.delete({ where:  {id: id} });
  if (!stmtDeleteSummaryDonate) {
    throw new AppError("Gagal menghapus laporan donasi / Failed delete donate summary/report", 500);
  }
  return stmtDeleteSummaryDonate;
};

module.exports = { 
  getSummaryDonate,
  getSummaryDonateBySocialActID,
  createSummaryDonateInSocialAct,
  deleteSummaryDonate
};