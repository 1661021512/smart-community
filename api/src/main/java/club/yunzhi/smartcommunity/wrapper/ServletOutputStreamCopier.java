package club.yunzhi.smartcommunity.wrapper;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * 获取response的body
 */
public class ServletOutputStreamCopier extends ServletOutputStream {

  private OutputStream outputStream;
  private ByteArrayOutputStream copy;

  public ServletOutputStreamCopier(OutputStream outputStream) {
    this.outputStream = outputStream;
    this.copy = new ByteArrayOutputStream(1024);
  }

  @Override
  public void write(int b) throws IOException {
    outputStream.write(b);
    copy.write(b);
  }

  public byte[] getCopy() {
    return copy.toByteArray();
  }

  public String copyString() {
    return copy.toString();
  }

  @Override
  public boolean isReady() {
    return false;
  }

  @Override
  public void setWriteListener(WriteListener writeListener) {

  }
}