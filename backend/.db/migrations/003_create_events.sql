CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    deskripsi TEXT,
    thumbnail TEXT,
    tanggal TIMESTAMP NOT NULL,
    tanggal_akhir TIMESTAMP,
    lokasi VARCHAR(255),
    kuota INTEGER DEFAULT 0,
    biaya DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'akan_datang',
    kategori VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
