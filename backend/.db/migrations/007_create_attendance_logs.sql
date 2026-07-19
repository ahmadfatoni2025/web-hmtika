CREATE TABLE IF NOT EXISTS attendance_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attendance_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    waktu_absen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(attendance_id, user_id),
    FOREIGN KEY (attendance_id) REFERENCES attendances(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
