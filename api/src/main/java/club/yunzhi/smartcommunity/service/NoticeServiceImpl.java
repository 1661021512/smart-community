package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Notice;
import club.yunzhi.smartcommunity.repository.NoticeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;

/**
 * 通知服务层
 */
@Service
public class NoticeServiceImpl implements NoticeService {
  private final static Logger logger = LoggerFactory.getLogger(NoticeServiceImpl.class);
  private final NoticeRepository noticeRepository;

  public NoticeServiceImpl(NoticeRepository noticeRepository) {
    this.noticeRepository = noticeRepository;
  }

  @Override
  public void delete(Long id) {
    Notice notice = this.noticeRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("删除实体未找到"));

    logger.debug("实体存在的情况下，将该实体进行删除");
    this.noticeRepository.deleteById(notice.getId());
  }

  @Override
  public Notice getById(Long id) {
    return this.noticeRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("通知实体不存在"));
  }

  @Override
  public Page<Notice> page(Pageable pageable) {
    return this.noticeRepository.findAll(pageable);
  }

  @Override
  public Notice save(@NotNull Notice notice) {
    Notice newNotice = new Notice();
    newNotice.setTitle(notice.getTitle());
    newNotice.setSubTitle(notice.getSubTitle());
    newNotice.setSummary(notice.getSummary());
    newNotice.setContent(notice.getContent());
    newNotice.setImage(notice.getImage());
    this.noticeRepository.save(newNotice);
    return newNotice;
  }

  @Override
  public Notice update(Long id, Notice notice) {
    Notice oldNotice = this.noticeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    oldNotice.setTitle(notice.getTitle());
    oldNotice.setSubTitle(notice.getSubTitle());
    oldNotice.setSummary(notice.getSummary());
    oldNotice.setContent(notice.getContent());
    oldNotice.setImage(notice.getImage());
    this.noticeRepository.save(oldNotice);
    return oldNotice;
  }
}
