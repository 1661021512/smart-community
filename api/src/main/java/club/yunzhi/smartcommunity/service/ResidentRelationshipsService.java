package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.ResidentRelationships;

import java.util.List;

/**
 * 居民间关系
 */
public interface ResidentRelationshipsService {
  ResidentRelationships save(ResidentRelationships residentRelationships);

  /**
   *  获取居民做为起始方的关系列表
   * @param residentId 居民ID
   */
  List<ResidentRelationships> getFromAllByResidentId(Long residentId);

  /**
   * 更新两个居民的关系
   *
   * @param relationshipId    居民关系
   * @param oneResidentId     一个居民
   * @param anotherResidentId 另一个居民
   * @return
   */
  void updateBetweenTwoResidents(Long relationshipId, Long oneResidentId, Long anotherResidentId);
}
