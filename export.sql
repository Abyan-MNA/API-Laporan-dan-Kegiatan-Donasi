-- --------------------------------------------------------
-- Host:                         W:\KACHINA\KACHINA\www\api-laporan-kegiatan-sosial\load\clorinde.trailblazer.kachina
-- Versi server:                 3.45.3
-- OS Server:                    
-- HeidiSQL Versi:               12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Membuang data untuk tabel clorinde.trailblazer.kegiatan: 5 rows
/*!40000 ALTER TABLE "kegiatan" DISABLE KEYS */;
REPLACE INTO "kegiatan" ("id", "judul", "deskripsi", "lokasi", "tanggal_mulai", "tanggal_selesai", "status") VALUES
	(1, 'Silaturahmi Bersama Pasukan Uthabiti Kachina, Pasukan Cipher, dan Anaxagoras', 'Ini adalah silaturahmi pertama kali di Pelabuhan Antartika', 'Masjid Jami'' Pelabuhan Antartika', '2025-05-31 06:15:09', '2025-06-01 17:00:00', 'selesai'),
	(2, 'Entahlah', 'Entahlah', 'Entahlah', '2025-06-19 09:00:00', NULL, 'draft'),
	(3, '1 Suro 1447: Persatuan', 'Syuroan', 'Di manapun, Hibrid', '2025-06-20 07:00:00', '2025-06-30 12:00:00', 'draft'),
	(4, 'Santunan dan Silaturahmi Untuk Persatuan', NULL, 'Masjid Perbatasan Broomstown', '2025-06-17 15:00:00', '2025-06-17 18:00:00', 'draft'),
	(5, 'Entahlah', 'Santuan secara sembunyi dan legal', 'Wilayah Kekuasaan FX', '2025-06-02 04:47:01', '2025-06-02 04:47:06', 'rejected');
/*!40000 ALTER TABLE "kegiatan" ENABLE KEYS */;

-- Membuang data untuk tabel clorinde.trailblazer.laporan_distribusi: 3 rows
/*!40000 ALTER TABLE "laporan_distribusi" DISABLE KEYS */;
REPLACE INTO "laporan_distribusi" ("id", "distribusiId", "penerima", "tanggal_distribusi", "metode_distribusi", "status_konfirmasi", "catatan", "kegiatanId") VALUES
	(2, 1, 'Uthabiti Kachina', '1748797200000', 'LANGSUNG', 'accepted', '', NULL),
	(3, 1, 'Anaxagoras', '2025-06-02 04:49:00', 'LANGSUNG', 'accepted', 'Mengalami keterlambatan', 1),
	(4, 4, 'Untuk anak yatim', '2025-06-20 08:00:00', 'Bagian Distribusi Kesultanan Antartika dan POSIND', 'pending', 'Kerjasama seluruh wilayah yang keterkaitan Antartika', 3);
/*!40000 ALTER TABLE "laporan_distribusi" ENABLE KEYS */;

-- Membuang data untuk tabel clorinde.trailblazer.laporan_donasi: 0 rows
/*!40000 ALTER TABLE "laporan_donasi" DISABLE KEYS */;
/*!40000 ALTER TABLE "laporan_donasi" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
