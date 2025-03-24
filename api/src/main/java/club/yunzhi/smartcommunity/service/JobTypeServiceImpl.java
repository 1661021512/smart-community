package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.JobType;
import club.yunzhi.smartcommunity.repository.JobTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class JobTypeServiceImpl implements JobTypeService {
  private final JobTypeRepository jobTypeRepository;

  public JobTypeServiceImpl(JobTypeRepository jobTypeRepository) {
    this.jobTypeRepository = jobTypeRepository;
  }

  @Override
  public List<JobType> findTop20ByNameContains(String name) {
    return this.jobTypeRepository.findTop20ByNameContainsAndDeletedIsFalse(name);
  }

  @Override
  public JobType save(JobType jobType) {
    Assert.notNull(jobType.getName(), "name can not be null");
    String name = jobType.getName().trim();
    Optional<JobType> optional = this.jobTypeRepository.findByNameAndDeletedIsFalse(name);
    if (optional.isPresent()) {
      return optional.get();
    }

    JobType newJobType = new JobType();
    newJobType.setName(name);
    return this.jobTypeRepository.save(newJobType);
  }
}
