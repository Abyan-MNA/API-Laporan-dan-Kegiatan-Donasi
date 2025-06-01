# API Laporan Donasi dan Kegiatan Sosial
Laporan donasi, distribusi, sekaligus kegiatan sosial. Untuk saat ini masih beta alias dapat digunakan dalam pengujian

Untuk contoh tautan:
```plaintext
https://api-laporan-dan-kegiatan-donasi.vercel.app/
```

## Konfigurasi
Contoh konfigurasi dalam environment
```properties
# API URL External
EXT1_API_URL=
EXT2_API_URL=

# PORT Server
PORT=3000 # Use port in not used by other server/software

# MySQL/MariaDB/PostgreSQL/SQL Server may have scheme server
DB_HOST=kachina.local # localhost , 127.0.0.254 , example.org or kachina.42.svr
DB_USER=root # Maybe have user such as user
DB_PASSWORD=Please don't show Uthabiti Kachina's passowrd or Castorice, Cipher, Clorinde, Neuvillette, Arlechino will shock you # Sensitive mode
DB_SELECTED=Database_selected # Sensitive name in UNIX (UNIX-Like so) or Huwawei/Harmony based, BE CAREFUL 
DB_PORT=3306 # Database Server PORT
DB_SERVER_PROVIDER=mysql # Must be know such as mysql or postgresql

# SQLite
DB_FILE=../load/filedatabase.kachina # File such as kachina.databse , database.db , or db.sqlite - BE CAREFUL

# Load Database
DATABASE_URL=${DB_SERVER_PROVIDER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_SELECTED}
DATABASE_LOAD_FILE=file:${DB_FILE}
```

Gunakan `.env.example`, salin ke `.env`, dan konfigurasi menyesuaikan server yang akan digunakan.

## Pemasangan
Diperlukan _Node JS_ versi 14 LTS ke atas dan _Node Package Manager_. Untuk install:
```sh
npm install
```

Setelah itu, migrasi, generasikan (_generate_), dan _push_ data
```sh
# prisma migrate
npx prisma migrate dev # Untuk dalam pengembangan atau development
npx prisma migrate deploy # Untuk produksi (production/staging)
npx prisma migrate reset # Reset semua database menyesuaikan skema database
# prisma generate
npx prisma generate
# prisma db push
npx prisma db push
``` 

Anda dapat konfigurasi `packages.json`, pasang modul/paket dari NPM, bahkan menjalankan dengan `npm run test`

## Skema database
Skema basis data dalam bentuk berkas `schema.prisma` seperti ini:
```prisma
...

model kegiatan {
  id                 Int                  @id @default(autoincrement())
  judul              String
  deskripsi          String?
  lokasi             String?
  tanggal_mulai      DateTime
  tanggal_selesai    DateTime?
  status             String               @default("draft")
  laporan_distribusi laporan_distribusi[]
  laporan_donasi     laporan_donasi[]
}

model laporan_distribusi {
  id                 Int       @id @default(autoincrement())
  distribusiId       Int
  penerima           String
  tanggal_distribusi DateTime
  metode_distribusi  String
  status_konfirmasi  String    @default("pending")
  catatan            String?
  kegiatanId         Int?
  kegiatan           kegiatan? @relation(fields: [kegiatanId], references: [id])

  @@index([kegiatanId], map: "laporan_distribusi_kegiatanId_fkey")
}

model laporan_donasi {
  id             Int       @id @default(autoincrement())
  donasiId       Int
  donaturId      String
  tanggal_donasi DateTime
  jumlah         Decimal?
  jenis_donasi   String
  status         String    @default("pending")
  bukti_url      String?
  kegiatanId     Int?
  kegiatan       kegiatan? @relation(fields: [kegiatanId], references: [id])

  @@index([kegiatanId], map: "laporan_donasi_kegiatanId_fkey")
}

```

## _Authorization Role Endpoint_
Lihat di [Github Repo: Rieko00/DonationAPI-Auth](https://github.com/Rieko00/DonationAPI-Auth?tab=readme-ov-file#1-registrasi-akun-baru)
### Admin
Akses endpoint yang tidak terbatas (mode Clorinde)
### _Volunteer_/Relawan
Akses endpoint yang hanya memasukkan maupun memutakhirkan (update) data (mode Trailblazer)
### User
Akses endpoint yang hanya bisa melihat data (mode Uthabiti Kachina)

## Endpoint
Masih belum uji coba