CREATE TABLE IF NOT EXISTS `laporan_kegiatan` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`judul` VARCHAR(191) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`deskripsi` VARCHAR(191) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`lokasi` VARCHAR(191) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`tanggal_mulai` DATETIME(3) NOT NULL,
	`tanggal_selesai` DATETIME(3) NULL DEFAULT NULL,
	`status` VARCHAR(191) NOT NULL DEFAULT 'draft' COLLATE 'utf8mb4_unicode_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;

CREATE TABLE IF NOT EXISTS `laporan_distribusi` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`distribusiId` INT(11) NOT NULL,
	`penerima` VARCHAR(191) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`tanggal_distribusi` DATETIME(3) NOT NULL,
	`metode_distribusi` VARCHAR(191) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`status_konfirmasi` VARCHAR(191) NOT NULL DEFAULT 'pending' COLLATE 'utf8mb4_unicode_ci',
	`catatan` VARCHAR(191) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`kegiatanId` INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `laporan_distribusi_kegiatanId_fkey` (`kegiatanId`) USING BTREE,
	CONSTRAINT `laporan_distribusi_kegiatanId_fkey` FOREIGN KEY (`kegiatanId`) REFERENCES `kegiatan` (`id`) ON UPDATE CASCADE ON DELETE SET NULL
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;

CREATE TABLE IF NOT EXISTS `laporan_donasi` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`donasiId` INT(11) NOT NULL,
	`donaturId` VARCHAR(191) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`tanggal_donasi` DATETIME(3) NOT NULL,
	`jumlah` DECIMAL(65,30) NULL DEFAULT NULL,
	`jenis_donasi` VARCHAR(191) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`status` VARCHAR(191) NOT NULL DEFAULT 'pending' COLLATE 'utf8mb4_unicode_ci',
	`bukti_url` VARCHAR(191) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`kegiatanId` INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `laporan_donasi_kegiatanId_fkey` (`kegiatanId`) USING BTREE,
	CONSTRAINT `laporan_donasi_kegiatanId_fkey` FOREIGN KEY (`kegiatanId`) REFERENCES `kegiatan` (`id`) ON UPDATE CASCADE ON DELETE SET NULL
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;
