const express = require("express");
const summary_donatedistreport = express.Router();
const { prisma } = require("../load/database");
const path = require('path');
const { 
  getSummaryDonate,
  getSummaryDonateBySocialActID,
  createSummaryDonateInSocialAct,
  deleteSummaryDonate
} = require("../services/laporanKegiatanSosial-donasi");
const { 
  getSummaryDistribution,
  getSummaryDistBySocialActID,
  createSummaryDistInSocialAct,
  deleteSummaryDistribution
} = require("../services/laporanKegiatanSosial-distribusi");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const AppError = require("../utils/AppError");

summary_donatedistreport.get("/", async (req, res) => {
  return res.status(200).type('text/html').sendFile(path.join(__dirname, '../load/summary-info.html'));
});


// Donation summary info
summary_donatedistreport.get("/donasi/laporan", authenticateToken, async (req, res) => {
  let { page, limit_per_page } = req.query;
  parsedPage = parseInt(page) || 1;
  parsedLimit = parseInt(limit_per_page) || 1000;
  const summaryDonate = await getSummaryDonate(undefined, parsedPage, parsedLimit);
  return res.status(200).json({
    status_info: "OK",
    page: parsedPage,
    limit: parsedLimit,
    message: "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
    data: summaryDonate
  });
});
summary_donatedistreport.get("/donasi/donate_id/:donate_id", authenticateToken, async (req, res) => {
  const { donate_id } = req.params;
  let { page, limit_per_page } = req.query;
  parsedPage = parseInt(page) || 1;
  parsedLimit = parseInt(limit_per_page) || 1000;
  const summaryDonate = await getSummaryDonate(donate_id, parsedPage, parsedLimit);
  return res.status(200).json({
    status_info: "OK",
    page: parsedPage,
    limit: parsedLimit,
    message: "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
    data: summaryDonate
  });
});

summary_donatedistreport.get("/donasi/kegiatan/:id", authenticateToken, async (req, res) => {
  const { id } =  req.params;
  let { page, limit_per_page } = req.query;
  parsedPage = parseInt(page) || 1;
  parsedLimit = parseInt(limit_per_page) || 1000;
  const summaryDonateInSocicalAct = await getSummaryDonateBySocialActID(id, parsedPage, parsedLimit);
  return res.status(200).json({
    status_info: "OK",
    page: parsedPage,
    limit: parsedLimit,
    message: "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
    data: summaryDonateInSocicalAct
  });
});

summary_donatedistreport.post("/donasi", authenticateToken, authorizeRole(["admin", "volunteer"]), async (req, res) => {
  const data = req.body;
  const createDonateDataReport = await createSummaryDonateInSocialAct(data);
  return res.status(201).json({
    status_info: "OK;Sent",
    message: "Laporan donasi sudah ditambahkan / Donation summary/report has added",
    request_data: createDonateDataReport
  });
});

summary_donatedistreport.delete("/donasi/:id", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { confirm } = req.query;
  if ({ id } == "*" && ({ confirm } != 1 || { confirm } != true)) {
    throw new AppError("DANGER: Yakin? / Are you sure? - Data it will deleted if confirm", 409);
  }
  const deleteDonateDataReport = await deleteSummaryDonate(id);
  return res.status(200).json({
    status_info: "OK;Deleted",
    message: "Data laporan donasi sudah dihapus / Summary/report donation data has deleted",
    info_data: deleteDonateDataReport
  })
});


// Distribution summary info
summary_donatedistreport.get("/distribusi/laporan", authenticateToken, async (req, res) => {
  let { page, limit_per_page } = req.query;
  parsedPage = parseInt(page) || 1;
  parsedLimit = parseInt(limit_per_page) || 1000;
  const summaryDist = await getSummaryDistribution(undefined, parsedPage, parsedLimit);
  return res.status(200).json({
    status_info: "OK",
    page: parsedPage,
    limit: parsedLimit,
    message: "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
    data: summaryDist
  });
});
summary_donatedistreport.get("/distribusi/distribusi_id/:distribusi_id", authenticateToken, async (req, res) => {
  const { distribusi_id } = req.params;
  let { page, limit_per_page } = req.query;
  parsedPage = parseInt(page) || 1;
  parsedLimit = parseInt(limit_per_page) || 1000;
  const summaryDist = await getSummaryDistribution(distribusi_id, parsedPage, parsedLimit);
  return res.status(200).json({
    status_info: "OK",
    page: parsedPage,
    limit: parsedLimit,
    message: "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
    data: summaryDist
  });
});

summary_donatedistreport.get("/distribusi/kegiatan/:id", authenticateToken, async (req, res) => {
  const { id } =  req.params;
  let { page, limit_per_page } = req.query;
  parsedPage = parseInt(page) || 1;
  parsedLimit = parseInt(limit_per_page) || 1000;
  const summaryDistInSocicalAct = await getSummaryDistBySocialActID(id, parsedPage, parsedLimit);
  return res.status(200).json({
    status_info: "OK",
    page: parsedPage,
    limit: parsedLimit,
    message: "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
    data: summaryDistInSocicalAct
  });
});

summary_donatedistreport.post("/distribusi", authenticateToken, authorizeRole(["admin", "volunteer"]), async (req, res) => {
  const data = req.body;
  const createDistDataReport = await createSummaryDistInSocialAct(data);
  return res.status(201).json({
    status_info: "OK;Sent",
    message: "Laporan donasi sudah ditambahkan / Donation summary/report has added",
    request_data: createDistDataReport
  });
});

summary_donatedistreport.delete("/distribusi/:id", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { confirm } = req.query;
  if ({ id } == "*" && ({ confirm } != 1 || { confirm } != true)) {
    throw new AppError("DANGER: Yakin? / Are you sure? - Data it will deleted if confirm", 409);
  }
  const deleteDistDataReport = await deleteSummaryDistribution(id);
  return res.status(200).json({
    status_info: "OK;Deleted",
    message: "Data laporan donasi sudah dihapus / Summary/report donation data has deleted",
    info_data: deleteDistDataReport
  })
})

module.exports = summary_donatedistreport;