package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Duty;
import club.yunzhi.smartcommunity.entity.PartyBuilding;

import java.util.List;

/**
 * 党建管理
 */
public interface PartyBuildingService {

  void deleteById(Long id);

  /**
   * 返回所有的党建实体根据当前登陆用户的区域类型
   *
   * @return
   */
  List<PartyBuilding> getAllOfCurrentUserDistrict();

  /**
   * 根据区域id获取所有该区域的党建信息
   *
   * @param districtId
   * @return
   */
  List<PartyBuilding> getAllByDistrictId(Long districtId);

  /**
   * 根据id获取实体
   *
   * @param dutyId     岗位id
   * @param districtId 区域ID
   */
  PartyBuilding getByDutyIdAndDistrictId(Long dutyId, Long districtId);

  /**
   * 查询当前登录用户所在区域中对应的某个职位
   *
   * @param dutyId 职位ID
   */
  PartyBuilding getByDutyIdOfCurrentDistrict(Long dutyId);

  PartyBuilding getById(Long id);

  /**
   * 新增党建管理-职务人员信息
   *
   * @param partyBuilding
   * @return
   */
  PartyBuilding save(PartyBuilding partyBuilding);

  /**
   * 保存
   *
   * @param duty         岗位
   * @param personalName 人员名称
   */
  PartyBuilding saveOfCurrentDistrict(Duty duty, String personalName);

  /**
   * 设置数据
   *
   * @param partyBuilding
   * @return
   */
  void setData(PartyBuilding partyBuilding, PartyBuilding newPartyBuilding);

  /**
   * 编辑党建人员信息
   *
   * @param dutyId
   * @param districtId
   * @param partyBuilding
   * @return
   */
  PartyBuilding update(Long dutyId, Long districtId, PartyBuilding partyBuilding);

  PartyBuilding updateById(Long id, PartyBuilding partyBuilding);

  /**
   * 验证数据是否符合要求
   *
   * @param partyBuilding
   * @return
   */
  void validateField(PartyBuilding partyBuilding);
}
