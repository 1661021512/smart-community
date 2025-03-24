
create table attachment (id bigint not null auto_increment, create_time datetime(6), delete_at bigint not null, deleted bit, update_time datetime(6), ext varchar(255), name varchar(255), create_user_id bigint, update_user_id bigint, file_id bigint not null, primary key (id)) engine=InnoDB;
create table my_file (id bigint not null auto_increment, create_time datetime(6), delete_at bigint not null, deleted bit, update_time datetime(6), md5 varchar(255), mime varchar(255), name varchar(255), path varchar(255), quote_number integer not null, sha1 varchar(255), create_user_id bigint, update_user_id bigint, primary key (id)) engine=InnoDB;
alter table attachment add constraint FK3bw3o0qnhedub4rh5s0vnu889 foreign key (create_user_id) references user (id);
alter table attachment add constraint FKgosoqthsbc82oyixsf7acryka foreign key (update_user_id) references user (id);
alter table attachment add constraint FK2calnf033my9dcy39wuhr61fr foreign key (file_id) references my_file (id);
alter table my_file add constraint FKnkgopkw074yqmnxyv9tyvqj0c foreign key (create_user_id) references user (id);
alter table my_file add constraint FKrgehwrp2n3kmwk5fwljpwk5jt foreign key (update_user_id) references user (id);
