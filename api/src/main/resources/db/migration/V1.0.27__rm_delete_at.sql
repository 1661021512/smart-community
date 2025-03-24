-- 删除delete_at字段
ALTER TABLE `attachment` DROP COLUMN `delete_at`, DROP COLUMN `deleted`;
ALTER TABLE `user` DROP COLUMN `delete_at`, DROP COLUMN `deleted`;
ALTER TABLE `resident_relationships` DROP COLUMN `delete_at`, DROP COLUMN `deleted`;
ALTER TABLE `my_file` DROP COLUMN `delete_at`, DROP COLUMN `deleted`;