package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Relationship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 居民关系
 */
public interface RelationshipService {
  List<Relationship> findAll();

  Relationship save(Relationship relationship);

  Page<Relationship> page(String name, Pageable pageable);

  Relationship getById(Long id);

  void delete(Long id);

  /**
   * 根据两个居民id获取居民关系
   *
   * @param oneRelationId
   * @param anotherRelationId
   * @return
   */
  Relationship getByResidentIds(Long oneRelationId, Long anotherRelationId);

  Relationship update(Long id, Relationship relationship);
}
