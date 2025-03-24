package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.BaseEntity;
import club.yunzhi.smartcommunity.entity.HistoryExportExcel;
import club.yunzhi.smartcommunity.service.HistoryExportExcelService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 历史导出队列控制类
 * @author xiaoqiang
 */
@RestController
@RequestMapping("historyExportExcel")
public class HistoryExportExcelController {
    private final HistoryExportExcelService historyExportExcelService;

    public HistoryExportExcelController(HistoryExportExcelService historyExportExcelService) {
        this.historyExportExcelService = historyExportExcelService;
    }

    @GetMapping("getAllByStatusIsExported")
    @JsonView(getAllByStatusIsExported.class)
    public List<HistoryExportExcel> getAllByStatusIsExported() {
        return this.historyExportExcelService.getAllByStatusIsExported();
    }

    private class getAllByStatusIsExported implements HistoryExportExcel.QueryParametersJsonView,
        BaseEntity.CreateTimeJsonView {
    }

}
