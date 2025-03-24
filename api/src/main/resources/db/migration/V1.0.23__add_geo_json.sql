alter table district add column secondary_geo_json_id bigint;
alter table district add constraint FK1ljref14jqciiv5bk7jf542c0 foreign key (secondary_geo_json_id) references attachment (id);