package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Content;
import club.yunzhi.smartcommunity.service.ContentService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

/**
 * 内容
 */
@RestController
@RequestMapping("content")
public class ContentController {
  private final ContentService contentService;

  public ContentController(ContentService contentService) {
    this.contentService = contentService;
  }

  @GetMapping("existsByKeyword/{keyword}")
  public boolean existsByKeyword(@PathVariable String keyword) {
    return this.contentService.existsByKeyword(keyword);
  }

  @GetMapping("getByKeyword/{keyword}")
  @JsonView(GetByKeywordJsonView.class)
  public Content getByKeyword(@PathVariable String keyword) {
    return this.contentService.getByKeyword(keyword);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Content save(@RequestBody Content content) {
    return this.contentService.save(content);
  }

  @PutMapping("{id}")
  @JsonView(UpdateByIdJsonView.class)
  public Content updateById(@PathVariable Long id, @RequestBody Content content) {
    return this.contentService.updateById(id, content);
  }

  private static class GetByKeywordJsonView {
  }

  private class SaveJsonView {
  }

  private class UpdateByIdJsonView {
  }
}
