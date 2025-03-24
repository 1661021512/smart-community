package club.yunzhi.smartcommunity.service;

import org.springframework.stereotype.Service;

/**
 * 导出EXCEL工厂
 */
@Service
public class ExportExcelFactory {


  public ExportExcelFactory() {
  }

  ExportExcelService getExportExcelService() {
    return new ExportExcelServiceImpl();
  }
}
