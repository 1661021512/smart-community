-- delete_at to 0
update `community3d` SET delete_at = 0 where delete_at is null;
update `crimed_type` SET delete_at = 0 where delete_at is null;
update `cult` SET delete_at = 0 where delete_at is null;
update `district` SET delete_at = 0 where delete_at is null;
update `duty` SET delete_at = 0 where delete_at is null;
update `enterprise` SET delete_at = 0 where delete_at is null;
update `grider` SET delete_at = 0 where delete_at is null;
update `house` SET delete_at = 0 where delete_at is null;
update `job_type` SET delete_at = 0 where delete_at is null;
update `part_building` SET delete_at = 0 where delete_at is null;
update `relationship` SET delete_at = 0 where delete_at is null;
update `religious_belief` SET delete_at = 0 where delete_at is null;
update `resident_relationships` SET delete_at = 0 where delete_at is null;
update `role` SET delete_at = 0 where delete_at is null;
update `skill` SET delete_at = 0 where delete_at is null;
update `unit` SET delete_at = 0 where delete_at is null;
update `user` SET delete_at = 0 where delete_at is null;
update `village3d_model` SET delete_at = 0 where delete_at is null;

-- set not null of delete_at
ALTER TABLE `community3d` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `crimed_type` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `cult` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `district` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `duty` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `enterprise` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `grider` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `house` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `job_type` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `part_building` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `relationship` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `religious_belief` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `resident_relationships` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `role` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `skill` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `unit` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `user` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;
ALTER TABLE `village3d_model` MODIFY COLUMN `delete_at` bigint(20) NOT NULL AFTER `create_time`;