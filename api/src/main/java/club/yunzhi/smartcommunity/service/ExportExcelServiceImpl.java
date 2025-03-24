package club.yunzhi.smartcommunity.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.OutputStream;


public class ExportExcelServiceImpl implements ExportExcelService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final XSSFCellStyle style;
  private final XSSFWorkbook workbook;
  private XSSFSheet sheet;
  private Row row;
  private Cell cell;
  private int rowNumber;
  private int colNumber;

  public ExportExcelServiceImpl() {
    this.workbook = new XSSFWorkbook();
    this.style = this.getCellStyle();
  }

  /**
   * 设置单元格内容.
   *
   * @param row         行
   * @param columnCount 列
   * @param value       内容
   * @param style       样式
   */
  public void createCell(Row row, int columnCount, Object value, CellStyle style) {
    sheet.autoSizeColumn(columnCount);
    Cell cell = row.createCell(columnCount);
    if (value instanceof Integer) {
      cell.setCellValue((Integer) value);
    } else if (value instanceof Boolean) {
      cell.setCellValue((Boolean) value);
    } else if (value instanceof Long) {
      cell.setCellValue((Long) value);
    } else if (value instanceof String) {
      cell.setCellValue((String) value);
    } else {
      cell.setCellValue(value.toString());
    }
    cell.setCellStyle(style);
  }

  @Override
  public void setCell(String value) {
    this.setCell(value, false);
  }

  @Override
  public void setCell(String value, boolean autoSize) {
    this.cell = this.row.createCell(this.colNumber);
    this.cell.setCellValue(value);
    this.cell.setCellStyle(this.style);
    if (autoSize) {
      this.sheet.autoSizeColumn(this.colNumber);
    }
    this.colNumber++;
  }


  /**
   * 得到一个单元格样式.
   *
   * @return 样式
   */
  @Override
  public XSSFCellStyle getCellStyle() {
    XSSFCellStyle cellStyle = this.workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setFontName("Songti TC");
    font.setFontHeightInPoints((short) 16);
    cellStyle.setFont(font);
    return cellStyle;
  }

  @Override
  public void createSheet(String title) {
    this.sheet = workbook.createSheet(title);
    this.rowNumber = 0;
    this.row = this.sheet.createRow(this.rowNumber);
    this.colNumber = 0;
  }

  @Override
  public void setTitle(String title, int width) {
    width = Math.max(width, 1);
    //单元格范围 参数（int firstRow, int lastRow, int firstCol, int lastCol)
    CellRangeAddress cellRangeAddress = new CellRangeAddress(this.rowNumber, this.rowNumber, this.colNumber, width - 1);
    this.sheet.addMergedRegion(cellRangeAddress);
    this.cell = row.createCell(this.colNumber, CellType.STRING);
    this.cell.setCellValue(title);
    XSSFCellStyle style = this.getCellStyle();
    style.setAlignment(HorizontalAlignment.CENTER);
    this.cell.setCellStyle(style);
    this.colNumber = width;
  }

  @Override
  public void goToNextRow() {
    this.rowNumber++;
    this.colNumber = 0;
    this.row = this.sheet.createRow(this.rowNumber);
  }

  @Override
  public void write(OutputStream outputStream) {
    try {
      this.logger.debug("开始输出数据");
      this.workbook.write(outputStream);

      this.logger.debug("输出流输出数据");
      outputStream.flush();
      this.workbook.close();
    } catch (IOException e) {
      String message = "输出EXCEL时发生错误" + e.getMessage();
      this.logger.error(message);
      throw new RuntimeException(message);
    }
  }
}
