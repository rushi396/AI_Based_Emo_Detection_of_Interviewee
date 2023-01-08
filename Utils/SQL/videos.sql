CREATE TABLE `videos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `video_name` varchar(256) DEFAULT NULL,
    `storage_name` varchar(256) DEFAULT NULL,
    `is_report_is_ready` varchar(45) NOT NULL DEFAULT 'No',
    `upload_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `report_creation_time` timestamp NULL DEFAULT NULL,
    `uploaded_by` varchar(256) NOT NULL,
    `report_file_name` varchar(256) DEFAULT NULL,
    PRIMARY KEY (`id`)
)