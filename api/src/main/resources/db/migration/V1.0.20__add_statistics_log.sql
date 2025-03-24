alter table statistics add column statistics_log_id bigint not null;
create table statistics_log (id bigint not null auto_increment, create_time datetime(6), date integer, primary key (id)) engine=InnoDB;
ALTER TABLE `party_building` DROP FOREIGN KEY `FKpl1uu3a80fak58e6i7iffiwkm`;
ALTER TABLE `party_building` DROP INDEX `UKrdsui5459n125tr68dvkqhhlq`;
alter table party_building add constraint UKay96sb38o0xh2y9ikvnlva63r unique (duty_id, district_id, delete_at);
alter table party_building add constraint FKfkecr2nu84lhps8yukjei52y9 foreign key (duty_id) references duty (id);
delete from statistics where 1 = 1;
alter table statistics add constraint FKagiwhau1g8ukvrfdah4p9y3hv foreign key (statistics_log_id) references statistics_log (id);