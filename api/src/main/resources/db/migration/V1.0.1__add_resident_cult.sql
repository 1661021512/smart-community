alter table resident add column cult_id bigint;
alter table resident add constraint FKsyfdwlilrm9wmxtvle9nnuok5 foreign key (cult_id) references cult (id);