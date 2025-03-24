package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Content;

public interface ContentService {
  boolean existsByKeyword(String keyword);

  Content getByKeyword(String keyword);

  Content save(Content content);

  Content updateById(Long id, Content content);
}
