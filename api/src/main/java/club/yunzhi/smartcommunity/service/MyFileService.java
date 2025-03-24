package club.yunzhi.smartcommunity.service;


import club.yunzhi.smartcommunity.entity.MyFile;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;

/**
 * 文件服务.
 */
public interface MyFileService {
  String CONFIG_PATH = AttachmentService.CONFIG_PATH;
  void download(String filename, MyFile file, HttpServletResponse response);
  void download(MyFile file, OutputStream outputStream);
}
