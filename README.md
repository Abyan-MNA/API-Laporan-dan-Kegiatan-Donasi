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

Gunakan `.env.example`, salin ke `.env`, dan konfigurasi menyesuaikan server yang akan digunakan. Untuk deploy semisal Vercel, konfigurasi dapat menyesuaikan dengan provider delopyment yang digunakan.

## Pemasangan
Diperlukan _Node JS_ versi 14 LTS ke atas dan _Node Package Manager_. Untuk install:
```sh
npm install
```

Setelah itu, migrasi, generasikan (_generate_), maupun _push_ data
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

## Status Error
### Status error autentikasi
401 Unauthorized -- token tidak ada
```json
{
  "message": "Akses tidak diizinkan / Forbidden access. - Please login at https://donation-api-auth.vercel.app/auth/login with username and password in JSON body request (if use API with POST HTTP method) or integrated website for get token access"
}
```

401 Unauthorized -- token kadaluarsa / tidak valid
```json
{
  "message": "Token kadaluarsa / Expired token -- Please login again at https://donation-api-auth.vercel.app/auth/login for get token"
}
```

403 Forbidden -- tidak bisa menggunakan akses / akses ditolak
```json
{
  "status_info": "Error",
  "message": "Sayangnya tidak mendapat akses / Unfortunely, don't have access"
}
```

403 Forbidden -- hak akses khusus untuk tertentu
```json
{ 
  "status_info": "Error",
  "message": "Sayangnya akses ini hanya untuk admin atau ... / Unfortunely, this access only for admin or ..."
}
```

## Endpoint

### Menguji role

- `/test-trailblazer-mode`

  Dengan token bearer seperti ini: <br/>
  `Authorization: Bearer YOUR_TOKEN_FROM_AUTH`

  Kode status respon:
  - 200: Tampilan halaman
  - 401: Lihat di bagian status error autentikasi

- `/test-clorinde-mode`

  Dengan token bearer seperti ini: <br/>
  `Authorization: Bearer YOUR_TOKEN_FROM_AUTH`

  Kode status respon:
  - 200: Tampilan halaman
  - 403: Lihat di bagian status error autentikasi
  - 401: Lihat di bagian status error autentikasi


### Laporan

- Header yang sering digunakan:
  - `Authorization: Bearer YOUR_TOKEN_FROM_AUTH`

- Kueri yang sering digunakan (untuk metode HTTP `GET`):
  - `page`: Mengambil halaman laporan (bawahan: 1)
  - `limit_per_page`: Limit rekaman data per halaman (bawahan: 1000)

- `GET /data-laporan/donasi/laporan` (membutuhkan token autentikasi)
  
  Kode status respon:
  - 200: Contoh didapatkan
    ```json
    {
      "status_info": "OK",
      "page": 1,
      "limit": 1000,
      "message": "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
      "data": [
        {
          "id": 1,
          "donasiId": 44,
          "donaturId": "25",
          "tanggal_donasi": "2025-05-28T13:35:52.000Z",
          "jumlah": "72",
          "jenis_donasi": "barang",
          "status": "accepted",
          "bukti_url": null,
          "kegiatanId": null
        },
        {
          "...": "..."
        }    
      ]
    }
    ```
  - 401: Lihat di bagian status error
  - 500: FUNCTION_SERVERLESS_ERROR / Internal server error
- `GET /data-laporan/donasi/donate_id/:donate_id` (membutuhkan token autentikasi)

  `:donate_id` adalah parameter berdasarkan `donateId`
  
  Kode status respon:
  - 200: Contoh didapatkan
    ```json
    {
      "status_info": "OK",
      "page": 1,
      "limit": 1000,
      "message": "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
      "data": [
        {
          "id": 1,
          "donasiId": 44,
          "donaturId": "25",
          "tanggal_donasi": "2025-05-28T13:35:52.000Z",
          "jumlah": "72",
          "jenis_donasi": "barang",
          "status": "accepted",
          "bukti_url": null,
          "kegiatanId": null
        },
        {
          "...": "..."
        }    
      ]
    }
    ```
  - 401: Lihat di bagian status error
  - 500: FUNCTION_SERVERLESS_ERROR / Internal server error

- `GET /data-laporan/donasi/kegiatan/:id` (membutuhkan token autentikasi)

  `:id` adalah parameter berdasarkan `kegiatanId`
  
  Kode status respon:
  - 200: Contoh didapatkan
    ```json
    {
      "status_info": "OK",
      "page": 1,
      "limit": 1000,
      "message": "Laporan donasi / Summary report - Maybe too long if not split by limit column per page",
      "data": [
        {
          "id": 1,
          "donasiId": 44,
          "donaturId": "25",
          "tanggal_donasi": "2025-05-28T13:35:52.000Z",
          "jumlah": "72",
          "jenis_donasi": "barang",
          "status": "accepted",
          "bukti_url": null,
          "kegiatanId": null
        },
        {
          "...": "..."
        }    
      ]
    }
    ```
  - 401: Lihat di bagian status error
  - 500: FUNCTION_SERVERLESS_ERROR / Internal server error

- `POST /data-laporan/donasi/` (membutuhkan token akses dan role admin, volunteer)

  Permintaan berupa skema JSON:
  ```json
  {
    "donasiId": Int,
    "donaturId": String,
    "tanggal_donasi": DateTime,
    "jumlah": Int/Float,
    "jenis_donasi": String,
    "status": String,
    "bukti_url": String,
    "kegiatanId": Int
  }
  ```
  Contoh seperti ini:
  ```json
  {
    "donasiId": 1,
    "donaturId": 1,
    "tanggal_donasi": "2025-06-01T00:00:00Z",
    "jumlah": 1,
    "jenis_donasi": "barang",
    "status": "accepted",
    "bukti_url": null,
    "kegiatanId": null
  }
  ```

  Respon dari server:
  - 200: Contoh hasil dalam bentuk JSON
    ```json
    {
    "status_info": "OK;Sent",
    "message": "Laporan donasi sudah ditambahkan / Donation summary/report has added",
      "request_data": {
          "id": 11,
          "donasiId": 1,
          "donaturId": "1",
          "tanggal_donasi": "2025-06-01T00:00:00.000Z",
          "jumlah": "1",
          "jenis_donasi": "barang",
          "status": "accepted",
          "bukti_url": null,
          "kegiatanId": null
      }
    }
    ```
  - 400: Ada bagian yang harus diisi
  - 401: Token bermasalah
  - 403: Tidak bisa karena hak akses untuk `admin` maupun `volunteer`
  - 500: DATABASE_ERROR / Internal server error

### Kegiatan

> CATATAN: Gunakan autentikasi token. Lihat di [Github Repo: Rieko00/DonationAPI-Auth](https://github.com/Rieko00/DonationAPI-Auth) untuk cara autentikasi.

- `POST  /data-kegiatan-sosial`
  
  Dalam isian contoh untuk _request body_ dalam bentuk JSON (`Content-Type: application/json`):
  ```json
  {
    "judul": "Kegiatan Pertemuan", // String
    "deskripsi": "Deskripsi kegiatan pertemuan", // String
    "tanggal_mulai": "2023-10-01", // Date
    "tanggal_selesai": "2023-10-05", // Date
    "lokasi": "Lokasi Pertemuan" // String
  }
  ```

- `GET /data-kegatan-sosial/:id`
  
  `:id` adalah parameter di mana berdasarkan ID di dalam tabel `kegiatan` (lihat di skema database).
  Jika ingin semuanya, tinggal hapus paramter `:id` (belum teruji).

- `PUT /data-kegiatan-sosial/:id` (Isian _request body_ **harus** lengkap)

  `:id` = parameter ID dalam tabel `kegiatan`.

  Dengan isian contoh untuk _request body_ dalam bentuk JSON (`Content-Type: application/json`):
  ```json
  {
    "judul": "Kegiatan Pertemuan", // String
    "deskripsi": "Deskripsi kegiatan pertemuan", // String
    "tanggal_mulai": "2023-10-01", // Date
    "tanggal_selesai": "2023-10-05", // Date
    "lokasi": "Lokasi Pertemuan", // String
    "status": "draft" // String: [ "draft", "accepted", "selesai", "rejected" ]
  }
  ```

- `PUT /data-kegiatan-sosial/:id` (Untuk update sebagian kolom rekaman data)

  `:id` = parameter ID dalam tabel `kegiatan`.

  Dengan isian contoh untuk _request body_ dalam bentuk JSON (`Content-Type: application/json`):
  ```json
  {
    "judul": "Kegiatan Pertemuan", // String
    "deskripsi": "Deskripsi kegiatan pertemuan", // String
    "tanggal_mulai": "2023-10-01", // Date
    "tanggal_selesai": "2023-10-05", // Date
    "lokasi": "Lokasi Pertemuan", // String
    "status": "draft" // String: [ "draft", "accepted", "rejected" ]
  }
  ```

- `DELETE /data-kegiatan-sosial/:id`

  `:id` = parameter ID dalam tabel `kegiatan`.

  CATATAN: **TIDAK DAPAT DIURUNGKAN. PASTIKAN BENAR-BENAR YAKIN**