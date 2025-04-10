create table content (id bigint not null auto_increment, create_time datetime(6), delete_at bigint not null, deleted bit, update_time datetime(6), content TEXT not null, keyword varchar(255) not null, title varchar(255) not null, create_user_id bigint, update_user_id bigint, primary key (id)) engine=InnoDB;
create table job (id bigint not null auto_increment, create_time datetime(6), delete_at bigint not null, deleted bit, update_time datetime(6), content TEXT not null, end_date integer not null, origin varchar(255) not null, summary varchar(255) not null, title varchar(255) not null, weight integer not null, create_user_id bigint, update_user_id bigint, primary key (id)) engine=InnoDB;
alter table notice add column summary varchar(255) not null;
alter table volunteer add column phone varchar(255) not null;
alter table volunteer add column wechat_user_id varchar(255) not null;
alter table volunteer_activity add column number_of_audited integer not null;
alter table volunteer_activity add column number_of_planned integer not null;
alter table volunteer_activity add column image_id bigint;
create table volunteer_activity_sign_up (id bigint not null auto_increment, create_time datetime(6), delete_at bigint not null, deleted bit, update_time datetime(6), status smallint not null, volunteer_id bigint not null, volunteer_activity_id bigint not null, primary key (id)) engine=InnoDB;
create table wechat_user (id varchar(255) not null, address varchar(255), birthday integer, education smallint, enabled bit not null, introduction varchar(255), mobile varchar(255), name varchar(255) not null, registered bit not null, sex bit, primary key (id)) engine=InnoDB;
alter table content add constraint UKgq99e3frqwfrnn3pec3des4h3 unique (keyword, delete_at);
create index IDXfb43dcw2gcah794enp3d1bp38 on job (weight);
create index IDXmtsqcmg0r8ky3n640asmpx0g4 on notice (weight);
alter table volunteer_activity_sign_up add constraint UKon0eq9xb4ar4rv9hx5uy78two unique (volunteer_activity_id, volunteer_id, delete_at);
alter table content add constraint FKhfita8kj8kfbbdxi8lrfvq58g foreign key (create_user_id) references user (id);
alter table content add constraint FKh3moex5tnu0vcftykxp5ghj5r foreign key (update_user_id) references user (id);
alter table job add constraint FKf5t0vblecrhcrq0gwy1bs2wmg foreign key (create_user_id) references user (id);
alter table job add constraint FKtbowfpqjqlsy3xnr6s0yjj8i5 foreign key (update_user_id) references user (id);
alter table volunteer add constraint FKjgbp3gnem1too7j6prot4q1qn foreign key (wechat_user_id) references wechat_user (id);
alter table volunteer_activity add constraint FKq27fmvw5us14wblyhvu6gyio foreign key (image_id) references attachment (id);
alter table volunteer_activity_sign_up add constraint FKeliepvnpvmhxnrhtjhw8r2xvb foreign key (volunteer_id) references volunteer (id);
alter table volunteer_activity_sign_up add constraint FK8fpsuyux4qcljmsrs6q1ap8q4 foreign key (volunteer_activity_id) references volunteer_activity (id);
ALTER TABLE `volunteer_activity` MODIFY COLUMN `number_of_applicants` int(20) NULL DEFAULT NULL AFTER `name`;