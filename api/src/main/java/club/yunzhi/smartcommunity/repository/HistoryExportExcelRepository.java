package club.yunzhi.smartcommunity.repository;


import club.yunzhi.smartcommunity.entity.HistoryExportExcel;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author xiaoqiang
 */
public interface HistoryExportExcelRepository extends PagingAndSortingRepository<HistoryExportExcel, Long>,
        JpaSpecificationExecutor<HistoryExportExcel> {
    List<HistoryExportExcel> findAllByStatus(short shatus);
}
