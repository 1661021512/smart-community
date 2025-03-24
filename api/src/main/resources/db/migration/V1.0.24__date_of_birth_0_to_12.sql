-- 将生日中的hour设置为0
UPDATE `resident` set `date_of_birth` = DATE_ADD(`date_of_birth`, INTERVAL 12 HOUR) where HOUR(`date_of_birth`) = 0;