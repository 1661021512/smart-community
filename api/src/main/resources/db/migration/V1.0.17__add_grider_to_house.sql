-- 房屋添加网格员
alter table house add column grider_id bigint;
alter table house add constraint FKippdgjmvnce9hpoj49kuju1sv foreign key (grider_id) references grider (id);