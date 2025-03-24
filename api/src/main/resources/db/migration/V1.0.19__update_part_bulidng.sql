ALTER TABLE `part_building` DROP FOREIGN KEY `FKc1oqn83g2fhrw4b2dwddg2qqu`;
ALTER TABLE `part_building` DROP INDEX `FKc1oqn83g2fhrw4b2dwddg2qqu`;
ALTER TABLE `part_building` DROP COLUMN `user_id`;
alter table part_building add column person_name varchar(255);
ALTER TABLE `part_building` DROP FOREIGN KEY `FKpl1uu3a80fak58e6i7iffiwkm`;
ALTER TABLE `part_building` DROP INDEX `UKen6r02aphns5xnx1ogbbvhows`;
alter table part_building add constraint UKrdsui5459n125tr68dvkqhhlq unique (duty_id, district_id, delete_at);
alter table part_building add constraint FKpl1uu3a80fak58e6i7iffiwkm foreign key (duty_id) references duty (id);
ALTER TABLE part_building RENAME TO party_building;