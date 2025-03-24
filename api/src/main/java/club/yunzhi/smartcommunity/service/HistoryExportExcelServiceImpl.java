package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.HistoryExportExcel;
import club.yunzhi.smartcommunity.repository.HistoryExportExcelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * 历史导出列表控制类
 *
 * @author xiaoqiang
 */
@Service
public class HistoryExportExcelServiceImpl implements HistoryExportExcelService {
  private final Logger logger = LoggerFactory.getLogger(HistoryExportExcelService.class);
  private final ResidentService residentService;
  private final HistoryExportExcelRepository historyExportExcelRepository;

  /**
   * 导出excel表队列
   */
  private final Queue<HistoryExportExcel> historyExportExcelQueue = new LinkedList<HistoryExportExcel>();

  public HistoryExportExcelServiceImpl(ResidentService residentService,
                                       HistoryExportExcelRepository historyExportExcelRepository) {
    this.residentService = residentService;
    this.historyExportExcelRepository = historyExportExcelRepository;
  }

  /**
   * 每一秒执行一次，@Scheduled注解上次方法未执行完，下次方法不会执行
   */
  @Override
  @Scheduled(cron = "*/1 * * * * *")
  public void export() {
    while (!historyExportExcelQueue.isEmpty() && historyExportExcelQueue.peek().getStatus() == HistoryExportExcel.STATUS_WAIT_EXPORT) {
      // 获取队头
      HistoryExportExcel currentHistoryExportExcel = historyExportExcelQueue.peek();

      // 导出
      this.residentService.generateExcel(currentHistoryExportExcel);

      // 出队
      this.poll();
      this.updateStatus(currentHistoryExportExcel, HistoryExportExcel.STATUS_EXPORTED);
    }
  }

  @Override
  public List<HistoryExportExcel> getAllByStatusIsExported() {
    return this.historyExportExcelRepository.findAllByStatus(HistoryExportExcel.STATUS_EXPORTED);
  }

  @Override
  public HistoryExportExcel getById(Long id) {
    return this.historyExportExcelRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关历史导出excel表记录"));
  }

  @Override
  public HistoryExportExcel getQueueHead() {
    if (this.queueIsEmpty()) {
      throw new EntityNotFoundException("导出队列队头元素未找到");
    }
    return this.historyExportExcelQueue.peek();
  }

  @Override
  public void pull(HistoryExportExcel historyExportExcel) {
    historyExportExcelQueue.offer(historyExportExcel);
  }

  @Override
  public void poll() {
    historyExportExcelQueue.poll();
  }

  @Override
  public Boolean queueIsEmpty() {
    return this.historyExportExcelQueue.isEmpty();
  }

  @Override
  public int queueLength() {
    return this.historyExportExcelQueue.size();
  }

  @Override
  public HistoryExportExcel save(HistoryExportExcel historyExportExcel) {
    return this.historyExportExcelRepository.save(historyExportExcel);
  }

  @Override
  public HistoryExportExcel updateStatus(HistoryExportExcel historyExportExcel, short status) {
    historyExportExcel = this.getById(historyExportExcel.getId());
    historyExportExcel.setStatus(status);
    return this.historyExportExcelRepository.save(historyExportExcel);
  }
}
