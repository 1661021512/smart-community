package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.ReligiousBelief;

import java.util.List;

public interface ReligiousBeliefService {
  List<ReligiousBelief> findTop20ByNameContains(String name);

  ReligiousBelief save(ReligiousBelief jobType);
}
