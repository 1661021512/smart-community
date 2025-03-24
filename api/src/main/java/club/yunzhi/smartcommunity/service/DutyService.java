package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Duty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 岗位管理
 */
public interface DutyService {

  /**
   * 删除岗位
   * @param id
   */
  void delete(Long id);

  /**
   * 根据id获取实体
   *
   * @param id
   * @return
   */
  Duty getById(Long id);

  /**
   * 分页
   *
   * @param name             姓名
   * @param pageable
   * @return
   */
  Page<Duty> page(String name, Pageable pageable);

  /**
   * 新建保存
   *
   * @param duty
   */
  Duty save(Duty duty);

  /**
   * 更新岗位
   *
   * @param id
   * @param duty
   * @return
   */
  Duty update(Long id, Duty duty);

  /**
   * 校验传入的type是否合规
   *
   * @param type
   * @return
   */
  Boolean validateTypeOfDistrict(String type);

  /**
   * 根据当前用户区域类型获取当前登录用户对应区域的岗位列表
   *
   * @param type
   * @return
   */
  List<Duty> getAllByDistrictType(String type);
}
