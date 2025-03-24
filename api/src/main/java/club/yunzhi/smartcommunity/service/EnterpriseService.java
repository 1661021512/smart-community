package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Enterprise;

import java.util.List;

public interface EnterpriseService {
  List<Enterprise> findTop20ByNameContains(String name);

  Enterprise save(Enterprise skill);
}
