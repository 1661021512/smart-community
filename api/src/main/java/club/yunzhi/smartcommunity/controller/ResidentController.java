package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.Utils;
import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.HistoryExportExcelService;
import club.yunzhi.smartcommunity.service.ResidentService;
import club.yunzhi.smartcommunity.service.WebUserService;
import com.fasterxml.jackson.annotation.JsonView;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

/**
 * 居民管理
 */
@RestController
@RequestMapping("resident")
public class ResidentController {
  private final Logger logger = LoggerFactory.getLogger(ResidentController.class);
  private final ResidentService residentService;
  private final HistoryExportExcelService historyExportExcelService;
  private final WebUserService webUserService;

  public ResidentController(ResidentService residentService,
                            HistoryExportExcelService historyExportExcelService,
                            WebUserService webUserService) {
    this.residentService = residentService;
    this.historyExportExcelService = historyExportExcelService;
    this.webUserService = webUserService;
  }

  @PatchMapping("addHouseIfNotExist/{id}")
  @JsonView(AddHouseIfNotExistJsonView.class)
  public void addHouseIfNotExist(@PathVariable Long id, @RequestParam Long houseId) {
    this.residentService.addHouseIfNotExist(id, houseId);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.residentService.delete(id);
  }


  @GetMapping("downloadExcel/{token}")
  public void downloadExcel(@RequestParam String filename,
                            @PathVariable String token,
                            HttpServletResponse httpServletResponse) throws IOException {
    ServletOutputStream outputStream = httpServletResponse.getOutputStream();
    httpServletResponse.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    httpServletResponse.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
    // 防止nginx缓存数据https://segmentfault.com/a/1190000040917571
    httpServletResponse.setHeader("X-Accel-Buffering", "no");
    outputStream.flush();
    this.residentService.downloadExcelByToken(token, outputStream);
    outputStream.close();
  }

  /**
   * 导出excel表
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
   */
  @GetMapping("exportExcel")
  public void exportExcel(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam(required = false, defaultValue = "") String phone,
      @RequestParam(required = false, defaultValue = "") String idNumber,
      @RequestParam(required = false, defaultValue = "") String workPlace,
      @RequestParam(required = false) Short politicalClimate,
      @RequestParam(required = false) Short education,
      @RequestParam(required = false, defaultValue = "") String religion,
      @RequestParam(required = false) Long districtId,
      @RequestParam(required = false) Integer beginAge,
      @RequestParam(required = false) Integer endAge,
      @RequestParam(required = false) Short nationality,
      @RequestParam(required = false) Boolean sex,
      @RequestParam(required = false) Boolean beVaccinated,
      HttpServletResponse httpServletResponse) throws IOException {

    this.logger.debug("发送header信息，触发浏览器的保存行为");
    String filename = (Utils.getDateString("yyyyMMdd") + new RandomString(92).nextString());
    char[] token = filename.toCharArray();
    ServletOutputStream outputStream = httpServletResponse.getOutputStream();
    // 在入队前获取队列长队
    int queueLength = this.historyExportExcelService.queueLength();
    // 保存并入队
    HistoryExportExcel historyExportExcel = new HistoryExportExcel(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        districtId,
        beginAge,
        endAge,
        nationality,
        sex,
        beVaccinated);
    historyExportExcel.setFilename(filename);
    historyExportExcel.setWebUser(this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new));
    // 如果当前队列不空，直接返回队列长度
    if (queueLength != 0) {
      historyExportExcel.setStatus(HistoryExportExcel.STATUS_WAIT_EXPORT);
      historyExportExcel = this.historyExportExcelService.save(historyExportExcel);
      this.historyExportExcelService.pull(historyExportExcel);

      httpServletResponse.setHeader("content-type", "application/json");
      outputStream.write(queueLength);
      outputStream.close();
      return;
    }
    // 队列为空，直接进行导出
    historyExportExcel.setStatus(HistoryExportExcel.STATUS_EXPORTING);
    historyExportExcel = this.historyExportExcelService.save(historyExportExcel);
    this.historyExportExcelService.pull(historyExportExcel);

    httpServletResponse.setBufferSize(token.length);
    // 防止nginx缓存数据https://segmentfault.com/a/1190000040917571
    httpServletResponse.setHeader("X-Accel-Buffering", "no");
    final int[] currentProgress = {0};
    outputStream.write(token[currentProgress[0]]);
    currentProgress[0]++;
    outputStream.flush();

    this.residentService.exportExcel(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        districtId,
        beginAge,
        endAge,
        nationality,
        sex,
        beVaccinated,
        filename,
        progress -> {
          while (currentProgress[0] < progress) {
            try {
              outputStream.write(token[currentProgress[0]]);
              outputStream.flush();
              currentProgress[0]++;
            } catch (IOException e) {
              String message = "下载过程被中断";
              this.logger.error(message);
              e.printStackTrace();
              throw new RuntimeException(message);
            }
          }
        });
    outputStream.close();

    // 直接导出后出队,如果队列不空（在导出过程中有其他导出任务加入），进行队列循环导出
    this.historyExportExcelService.poll();
    this.historyExportExcelService.updateStatus(historyExportExcel, HistoryExportExcel.STATUS_EXPORTED);
  }


  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Resident getById(@PathVariable Long id) {
    return this.residentService.getById(id);
  }

  @GetMapping("getByIdNumber/{idNumber}")
  @JsonView(GetByIdNumberJsonView.class)
  public Resident getByIdNumber(@PathVariable String idNumber) {
    return this.residentService.getByIdNumber(idNumber);
  }

  /**
   * 分页信息
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
   */
  @GetMapping("page")
  @JsonView(PageJsonViewWeb.class)
  public Page<Resident> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam(required = false, defaultValue = "") String phone,
      @RequestParam(required = false, defaultValue = "") String idNumber,
      @RequestParam(required = false, defaultValue = "") String workPlace,
      @RequestParam(required = false) Short politicalClimate,
      @RequestParam(required = false) Short education,
      @RequestParam(required = false, defaultValue = "") String religion,
      @RequestParam(required = false) Long districtId,
      @RequestParam(required = false) Integer beginAge,
      @RequestParam(required = false) Integer endAge,
      @RequestParam(required = false) Short nationality,
      @RequestParam(required = false) Boolean sex,
      @RequestParam(required = false) Boolean beVaccinated,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.residentService.page(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        districtId,
        beginAge,
        endAge,
        nationality,
        sex,
        beVaccinated,
        pageable);
  }


  @GetMapping("pageOfCurrentGrider")
  @JsonView(PageOfCurrentGriderJsonView.class)
  public Page<Resident> pageOfCurrentGrider(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) Boolean sex,
      @RequestParam(required = false) Integer ageBegin,
      @RequestParam(required = false) Integer ageEnd,
      @RequestParam(required = false) Short nationality,
      @RequestParam(required = false) String religion,
      @RequestParam(required = false) Short politicalClimate,
      @RequestParam(required = false) String phone,
      @RequestParam(required = false) Short education,
      @RequestParam(required = false) String workPlace,
      @RequestParam(required = false) String idNumber,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.residentService.pageOfCurrentGrider(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        ageBegin,
        ageEnd,
        nationality,
        sex,
        pageable);
  }

  @DeleteMapping("removeHouse/{id}")
  public void removeHouse(@PathVariable Long id, @RequestParam Long houseId) {
    this.residentService.removeHouse(id, houseId);
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public Resident save(@RequestBody Resident resident) {
    return this.residentService.save(resident);
  }

  @PostMapping("updateAll")
  @JsonView(UpdateAllJsonView.class)
  public List<Resident> updateAll(@RequestBody List<Resident> residents) {
    return this.residentService.updateAll(residents);
  }


  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Resident update(@PathVariable Long id, @RequestBody Resident resident) {
    return this.residentService.update(id, resident);
  }

  public static class AddJsonView implements Resident.CrimedTypeJsonView, Resident.EnterpriseJsonView, Resident.HouseJsonView, Resident.JobTypeJsonView, Resident.SkillJsonView, Resident.ReligiousBeliefJsonView {
  }

  public static class AddHouseIfNotExistJsonView {
  }

  public static class UpdateJsonView implements Resident.CrimedTypeJsonView, Resident.EnterpriseJsonView, Resident.HouseJsonView, Resident.JobTypeJsonView, Resident.SkillJsonView, Resident.ReligiousBeliefJsonView {
  }

  public static class PageJsonViewWeb implements Resident.EnterpriseJsonView,
      Resident.HouseJsonView,
      House.UnitJsonView,
      Unit.BuildingJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView,
      Resident.JobTypeJsonView,
      Resident.ReligiousBeliefJsonView,
      House.GriderJsonView,
      Grider.WebUserJsonView,
      Resident.PhoneJsonView{
  }

  private interface GetByIdNumberJsonView extends Resident.CrimedTypeJsonView,
      Resident.EnterpriseJsonView,
      Resident.HouseJsonView,
      Resident.CultJsonView,
      Resident.PhoneJsonView,
      Resident.IdNumberJsonView,
      House.UnitJsonView,
      Unit.BuildingJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView,
      Resident.JobTypeJsonView,
      Resident.SkillJsonView,
      Resident.ReligiousBeliefJsonView {
  }

  private interface GetByIdJsonView extends Resident.CrimedTypeJsonView,
      Resident.EnterpriseJsonView,
      Resident.HouseJsonView,
      Resident.CultJsonView,
      Resident.IdNumberJsonView,
      Resident.PhoneJsonView,
      House.UnitJsonView,
      Unit.BuildingJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView,
      Resident.JobTypeJsonView,
      Resident.SkillJsonView,
      Resident.ReligiousBeliefJsonView {
  }

  private static class UpdateAllJsonView {
  }

  private static class GetVaccinationCacheJsonView {
  }

  private static class PageOfCurrentGriderJsonView implements
      Resident.NationalityNameJsonView,
      Resident.EducationNameJsonView,
      Resident.HouseJsonView,
      Resident.ReligiousBeliefJsonView,
      House.UnitJsonView,
      Unit.BuildingJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView {
  }
}
