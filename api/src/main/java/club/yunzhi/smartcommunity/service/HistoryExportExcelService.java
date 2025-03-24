package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.HistoryExportExcel;

import java.io.IOException;
import java.util.List;

/**
 * @author xiaoqiang
 */
public interface HistoryExportExcelService {

    /**
     * 执行循环导出方法
     *
     * @throws IOException
     */
    void export() throws IOException;

    /**
     * 获取所有状态为已导出的历史导出excel表
     *
     * @return
     */
    List<HistoryExportExcel> getAllByStatusIsExported();

    /**
     * 通过id获取实体
     * @return 历史导出记录
     */
    HistoryExportExcel getById(Long id);

    /**
     * 获得队头元素
     * @return
     */
    HistoryExportExcel getQueueHead();

    /**
     * 对列入队
     *
     * @param historyExportExcel
     */
    void pull(HistoryExportExcel historyExportExcel);

    /**
     * 队头出队
     */
    void poll();

    /**
     * 队列是否为空
     *
     * @return
     */
    Boolean queueIsEmpty();

    /**
     * 返回队列长度
     * @return 长度
     */
    int queueLength();

    /**
     * 保存历史导出excel表
     *
     * @param historyExportExcel    历史导出列表
     */
    HistoryExportExcel save(HistoryExportExcel historyExportExcel);

    /**
     * 更新状态
     * @param historyExportExcel 历史导出记录
     * @param status 状态
     * @return 更新后的历史导出记录
     */
    HistoryExportExcel updateStatus(HistoryExportExcel historyExportExcel, short status);
}
