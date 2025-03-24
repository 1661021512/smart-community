package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Content;
import club.yunzhi.smartcommunity.repository.ContentRepository;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ContentServiceImpl implements ContentService {
  private final ContentRepository contentRepository;

  public ContentServiceImpl(ContentRepository contentRepository) {
    this.contentRepository = contentRepository;
  }

  @Override
  public boolean existsByKeyword(String keyword) {
    return this.contentRepository.existsByKeywordAndDeletedIsFalse(keyword);
  }

  @Override
  public Content getByKeyword(String keyword) {
    return this.contentRepository.findByKeywordAndDeletedIsFalse(keyword).orElseThrow(() -> new ObjectNotFoundException("对应KEY的内容未找到"));
  }

  @Override
  public Content save(Content newContent) {
    Content content = new Content();
    content.setTitle(newContent.getTitle());
    content.setContent(newContent.getContent());
    content.setKeyword(newContent.getKeyword());
    this.contentRepository.save(content);
    return content;
  }

  @Override
  public Content updateById(Long id, Content newContent) {
    Content content = this.contentRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("相关ID的实体未找到"));
    content.setTitle(newContent.getTitle());
    content.setContent(newContent.getContent());
    this.contentRepository.save(content);
    return content;
  }
}
