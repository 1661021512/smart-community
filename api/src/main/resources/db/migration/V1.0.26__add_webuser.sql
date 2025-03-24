SET NAMES utf8mb4;

-- wechat_user表
alter table wechat_user add column user_id bigint not null;

-- web_user表
create table web_user (id bigint not null auto_increment, create_time datetime(6), update_time datetime(6), delete_at bigint not null, deleted bit, password varchar(255), username varchar(255), create_user_id bigint, update_user_id bigint, user_id bigint not null, primary key (id)) engine=InnoDB;
alter table web_user add constraint UKg0ns4d33wf9ax70afkibr9rpd unique (username, delete_at);
alter table web_user add constraint FKom80kfc2h6qnrat1427h9dl7a foreign key (create_user_id) references user (id);
alter table web_user add constraint FK2s4px7aetd6jht1rei4y24rtk foreign key (update_user_id) references user (id);
alter table web_user add constraint FKj8q8n6h0vipwwa9fv26lrb9ok foreign key (user_id) references user (id);
INSERT INTO `web_user` (create_time, delete_at, deleted, password, username, update_time, create_user_id, update_user_id, user_id)
SELECT create_time, delete_at, deleted, password, username, update_time, create_user_id, update_user_id, id
FROM `user`;
alter table wechat_user add constraint FK11khi29xo0d2pfpp9u1pqekjm foreign key (user_id) references user (id);

-- user表 删除冗余的列
ALTER TABLE `user` DROP COLUMN `password`, DROP COLUMN `username`, DROP INDEX `UK5bd9yqnpf0w0teyr7iw28u388`;

-- grider表
ALTER TABLE `grider` DROP FOREIGN KEY `FKflcefjmxtwh8wlujker20b5ln`;
ALTER TABLE `grider` CHANGE COLUMN `user_id` `web_user_id` bigint(20) NOT NULL AFTER `community_id`;
update `grider` set `web_user_id` = (select `id` from `web_user` where `web_user`.`user_id` = `grider`.`web_user_id`);
alter table grider add constraint FK1ddm04l73p1sx6fwcmnqdqy0a foreign key (web_user_id) references web_user (id);

--  统计表
TRUNCATE TABLE `statistics`;
ALTER TABLE `statistics` DROP FOREIGN KEY `FK6f62k0fk8of8dux130d6ibc54`;
alter table statistics add constraint FK1dxdn0e9vut8opsvnkn5ie371 foreign key (user_id) references web_user (id);
ALTER TABLE `statistics` CHANGE COLUMN `user_id` `web_user_id` bigint(20) NOT NULL AFTER `total_count`;

-- 用户数据统计表
TRUNCATE TABLE `user_data_statistics`;
ALTER TABLE `user_data_statistics` DROP FOREIGN KEY `FKhilyejqcrpo7a9r1daatv70vl`;
alter table user_data_statistics add constraint FK99aaflpcbr7rqiuf2urmfh16f foreign key (user_id) references web_user (id);
ALTER TABLE `user_data_statistics` CHANGE COLUMN `user_id` `web_user_id` bigint(20) NOT NULL AFTER `town_id`;
ALTER TABLE `user_data_statistics` RENAME TO `web_user_data_statistics`;