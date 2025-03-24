package club.yunzhi.smartcommunity.service;

import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;



class ExportExcelServiceImplTest {

  public ExportExcelServiceImplTest() {
  }

  @Test
  void test() throws IOException {
    ExportExcelService exportExcelService = new ExportExcelServiceImpl();
    exportExcelService.createSheet("这里是标题");
    exportExcelService.setTitle("这里是标题", 4);
    exportExcelService.goToNextRow();
    exportExcelService.setCell("2423");
    exportExcelService.setCell(RandomString.make(4));
    exportExcelService.setCell(RandomString.make(4));
    exportExcelService.setCell(RandomString.make(4));
    exportExcelService.setCell(RandomString.make(4));

    exportExcelService.goToNextRow();
    exportExcelService.setCell(RandomString.make(4));
    exportExcelService.setCell(RandomString.make(4));
    exportExcelService.setCell(RandomString.make(4));
    exportExcelService.setCell(RandomString.make(4));

    File file = new File("exportExcelServiceImpl.xlsx");
    file.createNewFile();
    FileOutputStream fileOutputStream = new FileOutputStream(file);
    exportExcelService.write(fileOutputStream);
    fileOutputStream.close();
    // 测试导出效果的话，需要注释掉以下代码
    file.deleteOnExit();
  }
}