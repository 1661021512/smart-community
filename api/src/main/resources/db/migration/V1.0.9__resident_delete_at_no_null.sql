update `resident` set `delete_at` = 123123 where deleted = 1 and delete_at is null;
update `resident` SET `delete_at` = 0 where delete_at is null;
ALTER TABLE `resident` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
