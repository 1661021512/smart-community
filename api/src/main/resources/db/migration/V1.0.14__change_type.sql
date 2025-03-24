ALTER TABLE `statistics`
    MODIFY COLUMN `total_count` bigint(11) NULL DEFAULT NULL AFTER `create_time`;