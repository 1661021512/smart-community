alter table resident drop index UK_8xqclsumlm6suao1tlixgu99i;
alter table resident add constraint UK_8xqclsumlm6suao1tlixgu99i unique (id_number, delete_at);