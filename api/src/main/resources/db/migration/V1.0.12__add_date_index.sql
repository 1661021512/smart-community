alter table statistics add column date integer;
create index IDX49bgvoq0aav3l9p3x3u1nr96h on statistics (date);
create index IDXgnrmvbo98osetp2flq5w2hrgq on vaccination_cache (date);