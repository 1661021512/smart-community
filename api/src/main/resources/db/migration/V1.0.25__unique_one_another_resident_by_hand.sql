-- 注意：执行到本文件时，你将遇到一个控制台错误.
-- 本文件的作用是向居民间关系实体中，添加联系索引，从而保证居民与居民的关系是唯一的。
-- 此文件的作用在于去除历史的冗余数据.
-- 操作步骤如下：
-- 1. 查出所有的重复信息(有冗余，需要手动判断)
select '处理前重复的数据如下：';
select * from resident_relationships where one_resident_id in (select one_resident_id from resident_relationships GROUP BY one_resident_id, another_resident_id having count(one_resident_id) > 1) ORDER BY one_resident_id, another_resident_id;
delete from `resident_relationships` where `id` in (12368, 12369, 26407, 26409, 38132, 38134, 26745, 26748);
select '处理后重复的数据处下，如果存在请手动删除它们，详情请参考V1.0.25';
select * from resident_relationships where one_resident_id in (select one_resident_id from resident_relationships GROUP BY one_resident_id, another_resident_id having count(one_resident_id) > 1) ORDER BY one_resident_id, another_resident_id;
-- 然后手动删除重复的数据(两条索引相同的数据，只删除一条即可)
-- 最后添加联合索引
alter table volunteer_activity_sign_up add column create_user_id bigint;
alter table volunteer_activity_sign_up add column update_user_id bigint;
alter table resident_relationships add constraint UKlew6d3otm9ikw8e0nyr23yfe9 unique (one_resident_id, another_resident_id);
alter table volunteer_activity_sign_up add constraint FKrjf590w2j6f7bv8m9ujnft81i foreign key (create_user_id) references user (id);
alter table volunteer_activity_sign_up add constraint FKrkdfqgogw3jpnchnyv39eh84p foreign key (update_user_id) references user (id);
ALTER TABLE `house` MODIFY COLUMN `type` smallint(6) NOT NULL AFTER `remarks`;
