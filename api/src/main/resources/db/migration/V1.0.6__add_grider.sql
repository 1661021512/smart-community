create table grider (id bigint not null auto_increment, create_time datetime(6), delete_at bigint, deleted bit, update_time datetime(6), house_count bigint, resident_count bigint, create_user_id bigint, update_user_id bigint, community_id bigint not null, user_id bigint not null, primary key (id)) engine=InnoDB;
alter table grider add constraint FKp9tumlduf8mougw6k42cbfj8w foreign key (create_user_id) references user (id);
alter table grider add constraint FKqr17502nvqn72srp4ett8se47 foreign key (update_user_id) references user (id);
alter table grider add constraint FKsp4qvxx7rd9quof4xlaeqhtns foreign key (community_id) references district (id);
alter table grider add constraint FKflcefjmxtwh8wlujker20b5ln foreign key (user_id) references user (id);

-- 设置疫苗接种信息，默认为未接种
update resident set be_vaccinated = b'0' where be_vaccinated is NULL;
ALTER TABLE `resident` MODIFY COLUMN `be_vaccinated` bit(1) NOT NULL DEFAULT b'0' AFTER `update_time`;
