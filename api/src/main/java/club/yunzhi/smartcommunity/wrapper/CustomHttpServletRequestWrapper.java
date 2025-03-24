package club.yunzhi.smartcommunity.wrapper;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringWriter;

/**
 * HttpServletRequest的装饰器，解决获取Body遇到的流问题
 */
public class CustomHttpServletRequestWrapper extends HttpServletRequestWrapper {

  private byte[] body;
  private String stringBody;

  public CustomHttpServletRequestWrapper(HttpServletRequest request) throws IOException {
    super(request);

    BufferedReader reader = request.getReader();
    try (StringWriter writer = new StringWriter()) {
      int read;
      char[] buf = new char[1024 * 8];
      while ((read = reader.read(buf)) != -1) {
        writer.write(buf, 0, read);
      }
      stringBody = writer.getBuffer().toString();
      this.body = writer.getBuffer().toString().getBytes();
    }
  }

  public String getBody() {
    return stringBody;
  }

  @Override
  public ServletInputStream getInputStream() throws IOException {
    ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body);
    return new ServletInputStream() {

      @Override
      public int read() throws IOException {
        return byteArrayInputStream.read();
      }

      @Override
      public void setReadListener(ReadListener listener) {
      }

      @Override
      public boolean isReady() {
        return false;
      }

      @Override
      public boolean isFinished() {
        return false;
      }
    };
  }
}
