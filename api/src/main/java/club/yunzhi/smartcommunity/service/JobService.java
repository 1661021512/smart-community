package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 工作
 */
public interface JobService {
  void deleteById(Long id);

  Job getById(Long id);

  Page<Job> page(Pageable pageable);

  Job save(Job job);

  Job updateById(Long id, Job job);
}
