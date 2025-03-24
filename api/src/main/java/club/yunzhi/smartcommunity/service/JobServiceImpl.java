package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Job;
import club.yunzhi.smartcommunity.repository.JobRepository;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

/**
 * 工作
 */
@Service
public class JobServiceImpl implements JobService {
  private final JobRepository jobRepository;

  public JobServiceImpl(JobRepository jobRepository) {
    this.jobRepository = jobRepository;
  }

  @Override
  public void deleteById(Long id) {
    this.jobRepository.deleteById(id);
  }

  @Override
  public Job getById(Long id) {
    return this.jobRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("相关JOB未找到"));
  }

  @Override
  public Page<Job> page(Pageable pageable) {
    return this.jobRepository.findAll(pageable);
  }

  @Override
  public Job save(Job newJob) {
    Job job = new Job();
    job.setTitle(newJob.getTitle());
    job.setEndDate(newJob.getEndDate());
    job.setSummary(newJob.getSummary());
    job.setOrigin(newJob.getOrigin());
    job.setContent(newJob.getContent());
    this.jobRepository.save(job);
    return job;
  }

  @Override
  public Job updateById(Long id, Job newJob) {
    Job job = this.jobRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("相关JOB未找到"));
    job.setTitle(newJob.getTitle());
    job.setEndDate(newJob.getEndDate());
    job.setSummary(newJob.getSummary());
    job.setOrigin(newJob.getOrigin());
    job.setContent(newJob.getContent());
    this.jobRepository.save(job);
    return job;
  }
}
