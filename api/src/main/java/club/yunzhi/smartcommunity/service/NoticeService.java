package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {

  /**
   * 删除
   * @param id
   */
  void delete(Long id);

  /**
   * 根据id获取实体
   * @param id
   * @return
   */
  Notice getById(Long id);

  /**
   * 分页
   *
   * @param pageable
   * @return
   */
  Page<Notice> page(Pageable pageable);

  Notice save(Notice notice);

  Notice update(Long id, Notice notice);
}
