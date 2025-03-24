package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.JobType;

import java.util.List;

public interface JobTypeService {
  List<JobType> findTop20ByNameContains(String name);

  JobType save(JobType jobType);
}
