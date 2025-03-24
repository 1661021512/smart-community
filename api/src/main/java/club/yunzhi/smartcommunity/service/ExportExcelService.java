package club.yunzhi.smartcommunity.service;


import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.OutputStream;


public interface ExportExcelService {
  static String booleanToString(boolean trueOrFalse) {
    return trueOrFalse ? "是" : "否";
  }

  void setCell(String value);

  void setCell(String value, boolean autoSize);

  /**
   * 得到一个单元格样式
   *
   * @return 样式
   */
  CellStyle getCellStyle();

  void createSheet(String name);

  default void setTitle(String title) {
    this.setTitle(title, 1);
  }

  void setTitle(String title, int width);

  void goToNextRow();

  void write(OutputStream outputStream);
}
