package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Attachment;
import club.yunzhi.smartcommunity.entity.BaseEntity;
import club.yunzhi.smartcommunity.entity.Notice;
import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import club.yunzhi.smartcommunity.service.NoticeService;
import com.fasterxml.jackson.annotation.JsonMerge;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notice")
public class NoticeController {

  private final static Logger logger = LoggerFactory.getLogger(NoticeController.class);
  private final NoticeService noticeService;

  public NoticeController(NoticeService noticeService) {
    this.noticeService = noticeService;
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Notice getById(@PathVariable Long id) {
    return this.noticeService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Notice> page(@SortDefault.SortDefaults({
      @SortDefault(sort = {"weight"}, direction = Sort.Direction.ASC),
      @SortDefault(sort = {"id"}, direction = Sort.Direction.DESC)})
                               Pageable pageable) {
    return this.noticeService.page(pageable);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Notice save(@RequestBody Notice notice) {
    return this.noticeService.save(notice);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Notice update(@PathVariable Long id, @RequestBody Notice notice) {
    return this.noticeService.update(id, notice);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.noticeService.delete(id);
  }

  public class PageJsonView implements
      Notice.CreateUserJsonView,
      Notice.ImageJsonView,
      Attachment.MyFileJsonView,
      BaseEntity.CreateTimeJsonView {
  }

  public class GetByIdJsonView implements Notice.CreateUserJsonView,
      Notice.ImageJsonView,
      Attachment.MyFileJsonView,
      BaseEntity.CreateTimeJsonView {
  }

  private class SaveJsonView {
  }

  private class UpdateJsonView {
  }
}
