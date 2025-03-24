package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.ServletOutputStream;
import java.util.List;

public interface ResidentService {
  static void encodeIdNumberAndPhone(Resident resident) {
    if (resident != null) {
      resident.setIdNumber(ResidentService.idNumberEncode(resident.getIdNumber()));
      resident.setPhone(ResidentService.phoneEncode(resident.getPhone()));
    }
  }

  /**
   * 为居民添加住房
   *
   * @param id      居民ID
   * @param houseId 住房ID
   */
  Resident addHouseIfNotExist(Long id, Long houseId);

  long countByDistrict(District district);

  /**
   * 根据用户查询该用户的居民录入条数
   *
   * @param user 用户
   * @return
   */
  Long countByCreateUser(WebUser user);

  /**
   * 计算指定区域的接种人数
   *
   * @param district 传入区域
   * @return
   */
  Long countVaccinatedByDistrict(District district);

  /**
   * 获取指定区域内的演员数量
   *
   * @param district 区域
   * @return
   */
  Long countPartyMemberByDistrict(District district);

  /**
   * 清除昨天的excel文件
   */
  void clearYesterdayExcelFile();

  /**
   * 删除
   *
   * @param id
   */
  void delete(Long id);

  void downloadExcelByToken(String token, ServletOutputStream outputStream);

  /**
   * 导出EXCEL
   *
   * @param name             姓名
   * @param phone            电话
   * @param idNumber         身份证号码
   * @param workPlace        工作单元
   * @param politicalClimate 政治面貌
   * @param education        教育程序
   * @param religion         宗教信仰
   * @param districtId       区域
   * @param beginAge         开始年龄
   * @param endAge           结束年龄
   * @param nationality      民族
   * @param sex              性别
   * @param beVaccinated     是否接种疫苗
   * @param filename         文件名
   * @param exportProgress   导出进度
   */
  void exportExcel(String name,
                   String phone,
                   String idNumber,
                   String workPlace,
                   Short politicalClimate,
                   Short education,
                   String religion,
                   Long districtId,
                   Integer beginAge,
                   Integer endAge,
                   Short nationality,
                   Boolean sex,
                   Boolean beVaccinated,
                   String filename,
                   ExportProgress exportProgress);

  /**
   * 生成excel表
   * @param historyExportExcel 历史导出excel表
   */
  void generateExcel(HistoryExportExcel historyExportExcel);

  /**
   * 根据id获取实体
   *
   * @param id
   * @return
   */
  Resident getById(Long id);

  Resident getByIdNumber(String idNumber);

  /**
   * 身份证号加密
   */
  static String idNumberEncode(String oldString) {
    String dateOfBirth = oldString.substring(6, 14);
    String reciprocalSecond = oldString.substring(16, 17);
    String newIdNumber = "******" + dateOfBirth + "**" + reciprocalSecond + "*";
    return newIdNumber;
  }

  static String phoneEncode(String phone) {
    if (phone == null || phone.length() != 11) {
      return phone;
    }

    return phone.substring(0, 3) + "****" + phone.substring(7, 11);
  }

  /**
   * 新增居民
   *
   * @param resident
   * @return
   */
  Resident save(Resident resident);


  List<Resident> updateAll(List<Resident> residents);

  /**
   * 验证保存或更改数据
   *
   * @param resident
   */
  void validateSaveAndPostBasicData(Resident resident);

  /**
   * 更新居民基础信息
   *
   * @param id
   * @param resident
   * @return
   */
  Resident update(Long id, Resident resident);

  /**
   * 分页查询
   *
   * @param name             姓名
   * @param phone            电话
   * @param idNumber         身份证号码
   * @param workPlace        工作单元
   * @param politicalClimate 政治面貌
   * @param education        教育程序
   * @param religion         宗教信仰
   * @param districtId       区域
   * @param beginAge         开始年龄
   * @param endAge           结束年龄
   * @param nationality      民族
   * @param sex              性别
   * @param beVaccinated     是否接种疫苗
   * @param pageable         分页
   * @return
   */
  Page<Resident> page(String name,
                      String phone,
                      String idNumber,
                      String workPlace,
                      Short politicalClimate,
                      Short education,
                      String religion,
                      Long districtId,
                      Integer beginAge,
                      Integer endAge,
                      Short nationality,
                      Boolean sex,
                      Boolean beVaccinated,
                      Pageable pageable);

  /**
   * 移除住房
   *
   * @param id      居民
   * @param houseId 住房
   */
  Resident removeHouse(Long id, Long houseId);

  /**
   * 当前登录的网格员的分页信息
   *
   * @param name             姓名
   * @param phone            电话号码
   * @param idNumber         身份证号
   * @param workPlace        工作地点
   * @param politicalClimate 政治面貌
   * @param education        教育程度
   * @param religion         宗教
   * @param ageBegin         开始年龄
   * @param ageEnd           结束年龄
   * @param nationality      民族
   * @param sex              性别
   * @param pageable         分页
   * @return 分页内容
   * @author panjie
   */
  Page<Resident> pageOfCurrentGrider(String name,
                                     String phone,
                                     String idNumber,
                                     String workPlace,
                                     Short politicalClimate,
                                     Short education,
                                     String religion,
                                     Integer ageBegin,
                                     Integer ageEnd,
                                     Short nationality,
                                     Boolean sex,
                                     Pageable pageable);

  /**
   * 导出进度
   */
  interface ExportProgress {
    void sendProgress(int progress);
  }
}
