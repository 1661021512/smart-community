package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Unit;

import java.util.List;

/**
 * 单元
 */
public interface UnitService {

  /**
   * 根据id获取unit
   *
   * @param id
   * @return
   */
  Unit getById(Long id);

  /**
   * 新增
   *
   * @param unit 单元
   * @return
   */
  Unit save(Unit unit);

  /**
   * 更新单元
   *
   * @param id
   * @param unit
   * @return
   */
  Unit update(Long id, Unit unit);

  /**
   * 根据楼房id获取单元
   *
   * @param id
   * @return
   */
  List<Unit> getByBuildingId(Long id);

  /**
   * 删除单元
   *
   * @param id
   */
  void delete(Long id);
}
